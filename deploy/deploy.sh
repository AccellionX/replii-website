#!/usr/bin/env bash
# Safe deploy without Docker, isolated from other apps on the host:
#   - files only under /opt/replii-website
#   - private Node under /opt/replii-website/.runtime (does not change /usr/bin/node)
#   - no apt-get / NodeSource
#   - systemd unit replii-website only (never restarts other services)
#   - binds 127.0.0.1:8020; pre-flight :8021 (aborts if another process owns them)
#
#   1. unpack release to staging
#   2. npm ci + production build
#   3. pre-flight on :8021
#   4. only then swap current + restart replii-website on :8020
#
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/replii-website}"
ENV_FILE="${APP_DIR}/.env"
RELEASE_ID="${RELEASE_ID:?RELEASE_ID is required}"
INCOMING="${APP_DIR}/incoming/${RELEASE_ID}.tar.gz"
STAGING="${APP_DIR}/releases/${RELEASE_ID}"
CURRENT="${APP_DIR}/current"
RUNTIME="${APP_DIR}/.runtime"
NODE_HOME="${RUNTIME}/node"
SERVICE="replii-website"
PROD_PORT=8020
TEST_PORT=8021
PROD_URL="http://127.0.0.1:${PROD_PORT}/healthz"
KEEP_RELEASES=5
NODE_VERSION="${NODE_VERSION:-20.19.4}"
SITE_HOST="${SITE_HOST:-replii.accellionx.com}"
CERTBOT_WEBROOT="/var/www/certbot"

download() {
  local url="$1" dest="$2"
  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "${url}" -o "${dest}"
  elif command -v wget >/dev/null 2>&1; then
    wget -qO "${dest}" "${url}"
  else
    echo "curl or wget is required (will not apt-get so other apps stay untouched)"
    exit 1
  fi
}

port_in_use() {
  python3 - "$1" <<'PY'
import socket, sys
port = int(sys.argv[1])
sock = socket.socket()
sock.settimeout(0.4)
try:
    sock.connect(("127.0.0.1", port))
except OSError:
    sys.exit(1)
else:
    sys.exit(0)
finally:
    sock.close()
PY
}

assert_port_ok() {
  local port="$1"
  local allow_our_service="${2:-0}"
  if ! port_in_use "${port}"; then
    return 0
  fi
  if [[ "${allow_our_service}" == "1" ]] && systemctl is-active --quiet "${SERVICE}"; then
    echo "Port ${port} is ${SERVICE} — leaving it alone until cutover"
    return 0
  fi
  echo "Port ${port} is already in use by another process."
  echo "Refusing to bind so other apps on this host are not disturbed."
  exit 1
}

configure_nginx_and_tls() {
  if [[ ! -x /usr/sbin/nginx ]]; then
    echo "nginx not found; skip public vhost"
    return 0
  fi

  local available="/etc/nginx/sites-available/${SITE_HOST}.conf"
  local enabled="/etc/nginx/sites-enabled/${SITE_HOST}.conf"
  local live="/etc/letsencrypt/live/${SITE_HOST}/fullchain.pem"
  local http_src="${STAGING}/deploy/nginx.http.conf"
  local https_src="${STAGING}/deploy/nginx.replii.accellionx.com.conf"

  sudo mkdir -p "${CERTBOT_WEBROOT}"

  if [[ ! -f "${live}" ]]; then
    echo "==> Installing HTTP vhost for ${SITE_HOST} (ACME webroot, proxy :${PROD_PORT})"
    sudo install -m 644 "${http_src}" "${available}"
    sudo ln -sfn "${available}" "${enabled}"
    sudo nginx -t
    sudo systemctl reload nginx

    if ! command -v certbot >/dev/null 2>&1; then
      echo "certbot is missing; HTTP vhost is up but TLS was not issued"
      return 1
    fi

    echo "==> Issuing Let's Encrypt cert for ${SITE_HOST} only"
    sudo certbot certonly \
      --webroot -w "${CERTBOT_WEBROOT}" \
      -d "${SITE_HOST}" \
      --non-interactive --agree-tos \
      --key-type ecdsa \
      -m info@accellionx.com
  fi

  echo "==> Installing TLS vhost for ${SITE_HOST}"
  sudo install -m 644 "${https_src}" "${available}"
  sudo ln -sfn "${available}" "${enabled}"
  sudo nginx -t
  sudo systemctl reload nginx
}

ensure_private_node() {
  if [[ -x "${NODE_HOME}/bin/node" ]]; then
    local major
    major="$("${NODE_HOME}/bin/node" -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0)"
    if [[ "${major}" -ge 20 ]]; then
      echo "==> Private Node $("${NODE_HOME}/bin/node" -v) at ${NODE_HOME}"
      return 0
    fi
  fi

  local arch node_arch tarball url tmp prefix
  arch="$(uname -m)"
  case "${arch}" in
    x86_64) node_arch="x64" ;;
    aarch64|arm64) node_arch="arm64" ;;
    *)
      echo "Unsupported architecture: ${arch}"
      exit 1
      ;;
  esac

  tarball="node-v${NODE_VERSION}-linux-${node_arch}.tar.gz"
  url="https://nodejs.org/dist/v${NODE_VERSION}/${tarball}"
  tmp="$(mktemp "/tmp/replii-website-node.XXXXXX.tar.gz")"
  echo "==> Installing private Node ${NODE_VERSION} (${node_arch}) — not touching /usr/bin/node"
  download "${url}" "${tmp}"
  mkdir -p "${RUNTIME}"
  tar xzf "${tmp}" -C "${RUNTIME}"
  rm -f "${tmp}"
  prefix="${RUNTIME}/node-v${NODE_VERSION}-linux-${node_arch}"
  rm -rf "${NODE_HOME}"
  mv "${prefix}" "${NODE_HOME}"
  echo "==> Private Node $("${NODE_HOME}/bin/node" -v)"
}

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}"
  echo "Set GitHub secrets STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY (CD writes this file)."
  exit 1
fi

if [[ ! -f "${INCOMING}" ]]; then
  echo "Missing release tarball: ${INCOMING}"
  exit 1
fi

sudo mkdir -p "${APP_DIR}/releases" "${APP_DIR}/incoming" "${APP_DIR}/deploy" "${RUNTIME}"
sudo chown "$(id -un):$(id -gn)" \
  "${APP_DIR}" \
  "${APP_DIR}/releases" \
  "${APP_DIR}/incoming" \
  "${APP_DIR}/deploy" \
  "${RUNTIME}"

ensure_private_node
export PATH="${NODE_HOME}/bin:/usr/bin:/bin"

assert_port_ok "${TEST_PORT}" 0
assert_port_ok "${PROD_PORT}" 1

echo "==> Unpacking ${RELEASE_ID}"
rm -rf "${STAGING}"
mkdir -p "${STAGING}"
tar xzf "${INCOMING}" -C "${STAGING}"

install -m 755 "${STAGING}/deploy/deploy.sh" "${APP_DIR}/deploy/deploy.sh"
sudo install -m 644 "${STAGING}/deploy/replii-website.service" "/etc/systemd/system/${SERVICE}.service"

echo "==> Installing Node dependencies (private Node only)"
cd "${STAGING}"
npm ci

echo "==> Building Next.js (NEXT_PUBLIC_* is inlined at build time)"
set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a
if [[ -z "${NEXT_PUBLIC_SITE_URL:-}" ]]; then
  echo "NEXT_PUBLIC_SITE_URL must be set in ${ENV_FILE}"
  exit 1
fi
if [[ -z "${STRIPE_SECRET_KEY:-}" ]]; then
  echo "STRIPE_SECRET_KEY must be set in ${ENV_FILE}"
  exit 1
fi
export NODE_ENV=production
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=1024}"
npm run build

cleanup_test() {
  if [[ -n "${UV_PID:-}" ]] && kill -0 "${UV_PID}" 2>/dev/null; then
    kill "${UV_PID}" 2>/dev/null || true
    wait "${UV_PID}" 2>/dev/null || true
  fi
}
trap cleanup_test EXIT

echo "==> Pre-flight on 127.0.0.1:${TEST_PORT} (production on :${PROD_PORT} stays up)"
cd "${STAGING}"
set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a
export NODE_ENV=production
"${NODE_HOME}/bin/node" node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port "${TEST_PORT}" &
UV_PID=$!

for i in $(seq 1 45); do
  if curl -fsS "http://127.0.0.1:${TEST_PORT}/healthz" >/dev/null 2>&1; then
    echo "Pre-flight passed"
    break
  fi
  if ! kill -0 "${UV_PID}" 2>/dev/null; then
    echo "Pre-flight process exited early"
    exit 1
  fi
  if [[ "${i}" -eq 45 ]]; then
    echo "Pre-flight timed out"
    exit 1
  fi
  sleep 2
done

cleanup_test
trap - EXIT

PREV=""
if [[ -L "${CURRENT}" ]]; then
  PREV="$(readlink -f "${CURRENT}")"
fi

echo "==> Promoting release (restart ${SERVICE} only)"
ln -sfn "${STAGING}" "${CURRENT}"
sudo systemctl daemon-reload
sudo systemctl enable "${SERVICE}"

if ! sudo systemctl restart "${SERVICE}"; then
  echo "Restart failed — rolling back ${SERVICE} only"
  if [[ -n "${PREV}" ]]; then
    ln -sfn "${PREV}" "${CURRENT}"
    sudo systemctl restart "${SERVICE}" || true
  fi
  exit 1
fi

for i in $(seq 1 30); do
  if curl -fsS "${PROD_URL}" >/dev/null 2>&1; then
    echo "Deploy OK — ${RELEASE_ID}"
    curl -fsS "${PROD_URL}"
    echo
    rm -f "${INCOMING}"
    current_real="$(readlink -f "${CURRENT}")"
    count=0
    while IFS= read -r old; do
      count=$((count + 1))
      [[ "${count}" -le "${KEEP_RELEASES}" ]] && continue
      resolved="$(readlink -f "${old}")"
      if [[ "${resolved}" == "${current_real}" ]] || [[ -n "${PREV}" && "${resolved}" == "${PREV}" ]]; then
        continue
      fi
      rm -rf "${old}"
    done < <(ls -1dt "${APP_DIR}/releases"/*/ 2>/dev/null || true)
    configure_nginx_and_tls
    exit 0
  fi
  sleep 2
done

echo "Production health check failed — rolling back ${SERVICE} only"
if [[ -n "${PREV}" ]]; then
  ln -sfn "${PREV}" "${CURRENT}"
  sudo systemctl restart "${SERVICE}" || true
fi
exit 1
