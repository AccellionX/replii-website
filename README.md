# Replii Website

Marketing site for **Replii** — the agency platform that puts an AI inbox on every client’s WhatsApp, Instagram, and Facebook. Agencies subscribe (Launch $97 · Growth $297 · Unlimited $497). Advertisers are never billed.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (interactive sections only)
- Lucide React

## Requirements

Node.js 20+ (see `.nvmrc`)

## Environment

Copy `.env.example` to `.env.local` for local work:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

Production on EC2 uses `/opt/replii-website/.env` (see `deploy/env.production.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://replii.accellionx.com
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

- `NEXT_PUBLIC_SITE_URL` is used for `metadataBase`, canonical URL, Open Graph, and Stripe return URLs. It is inlined at **build** time, so the server `.env` must be in place before deploy.
- Stripe keys stay server-side. Checkout amounts are never taken from the browser — only the plan id.

## Production deploy (EC2)

Same shape as the WhatsApp order bot: tarball → staging on `:8021` → symlink `current` → systemd on `:8020` behind nginx.

| | |
| --- | --- |
| Public URL | `https://replii.accellionx.com` |
| App (dashboard) | `https://app.replii.accellionx.com` |
| systemd | `replii-website` |
| Bind | `127.0.0.1:8020` (pre-flight `:8021`) |
| App dir | `/opt/replii-website` |

Push to `main` (or **Actions → CI and deploy → Run workflow**) after the one-time host setup below.

### One-time on EC2

CI creates `/opt/replii-website` with sudo. You still need the env file (and passwordless sudo for `mkdir`/`chown`, same as the order-bot):

```bash
sudo mkdir -p /opt/replii-website
sudo chown ubuntu:ubuntu /opt/replii-website
nano /opt/replii-website/.env   # contents from deploy/env.production.example
chmod 600 /opt/replii-website/.env
```

Nginx + TLS (after DNS for `replii.accellionx.com` points at this instance):

```bash
sudo cp /path/to/nginx.replii.accellionx.com.conf /etc/nginx/sites-available/replii.accellionx.com
sudo ln -sf /etc/nginx/sites-available/replii.accellionx.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d replii.accellionx.com
```

`ubuntu` needs passwordless sudo for `apt-get`, `install` into `/etc/systemd/system`, and `systemctl` (same as the order-bot service).

### GitHub Actions secrets

| Secret | Required | Example |
| --- | --- | --- |
| `DEPLOY_HOST` | yes | EC2 public IP or hostname |
| `DEPLOY_SSH_KEY` | yes | Private key whose **public** key is in `ubuntu` `~/.ssh/authorized_keys` |
| `DEPLOY_USER` | no | `ubuntu` if omitted |
| `DEPLOY_PORT` | no | `22` if omitted |

Stripe keys stay on the server, not in GitHub.

## Scripts

```bash
nvm use          # Node 20
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm start        # production server after build
```

## Contact / CTAs

- Dashboard: `https://app.replii.accellionx.com/dashboard/login`
- Email: `info@accellionx.com` via `mailto:` helpers in `lib/constants.ts`
- Plans: Stripe Checkout from Pricing and the order form (`POST /api/checkout`)

## TODOs

Set real URLs in `TODO_LINKS` (`lib/constants.ts`) when ready:

- `companyWebsite`
- `privacy`
- `terms`
