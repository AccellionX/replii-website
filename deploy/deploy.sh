#!/usr/bin/env bash
# Safe deploy without Docker:
#   1. unpack release to staging
#   2. npm ci + production build
#   3. pre-flight on :8021
#   4. only then swap current + restart systemd on :8020
#
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/replii-website}"
ENV_FILE="${APP_DIR}/.env"
RELEASE_ID="${RELEASE_ID:?RELEASE_ID is required}"
INCOMING="${APP_DIR}/incoming/${RELEASE_ID}.tar.gz"
STAGING="${APP_DIR}/releases/${RELEASE_ID}"
CURRENT="${APP_DIR}/current"
SERVICE="replii-website"
PROD_URL="http://127.0.0.1:8020/healthz"
TEST_PORT=8021
KEEP_RELEASES=5

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}"
  echo "Copy deploy/env.production.example there and fill STRIPE_* keys (chmod 600)."
  exit 1
fi

if [[ ! -f "${INCOMING}" ]]; then
  echo "Missing release tarball: ${INCOMING}"
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "==> Installing curl"
  sudo apt-get update -y
  sudo apt-get install -y curl
fi

sys_node_major() {
  /usr/bin/node -p "process.versions.node.split('.')[0]" 2>/dev/null || echo 0
}

if [[ ! -x /usr/bin/node ]] || [[ "$(sys_node_major)" -lt 20 ]]; then
  echo "==> Installing Node.js 20"
  sudo apt-get update -y
  sudo apt-get install -y ca-certificates curl gnupg
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --batch --yes --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list >/dev/null
  sudo apt-get update -y
  sudo apt-get install -y nodejs
fi

if [[ ! -x /usr/bin/node ]] || [[ "$(sys_node_major)" -lt 20 ]]; then
  echo "Expected /usr/bin/node >= 20 after Node install (systemd ExecStart uses it)"
  exit 1
fi

export PATH="/usr/bin:/usr/local/bin:/bin:${PATH}"

mkdir -p "${APP_DIR}/releases" "${APP_DIR}/incoming" "${APP_DIR}/deploy"

echo "==> Unpacking ${RELEASE_ID}"
rm -rf "${STAGING}"
mkdir -p "${STAGING}"
tar xzf "${INCOMING}" -C "${STAGING}"

install -m 755 "${STAGING}/deploy/deploy.sh" "${APP_DIR}/deploy/deploy.sh"
sudo install -m 644 "${STAGING}/deploy/replii-website.service" /etc/systemd/system/${SERVICE}.service

echo "==> Installing Node dependencies"
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
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=2048}"
npm run build

cleanup_test() {
  if [[ -n "${UV_PID:-}" ]] && kill -0 "${UV_PID}" 2>/dev/null; then
    kill "${UV_PID}" 2>/dev/null || true
    wait "${UV_PID}" 2>/dev/null || true
  fi
}
trap cleanup_test EXIT

echo "==> Pre-flight on 127.0.0.1:${TEST_PORT} (production on :8020 stays up)"
cd "${STAGING}"
set -a
# shellcheck disable=SC1090
source "${ENV_FILE}"
set +a
export NODE_ENV=production
/usr/bin/node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port "${TEST_PORT}" &
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

echo "==> Promoting release"
ln -sfn "${STAGING}" "${CURRENT}"
sudo systemctl daemon-reload
sudo systemctl enable "${SERVICE}"

if ! sudo systemctl restart "${SERVICE}"; then
  echo "Restart failed — rolling back"
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
    exit 0
  fi
  sleep 2
done

echo "Production health check failed — rolling back"
if [[ -n "${PREV}" ]]; then
  ln -sfn "${PREV}" "${CURRENT}"
  sudo systemctl restart "${SERVICE}" || true
fi
exit 1
