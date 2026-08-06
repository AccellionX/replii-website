# Replii Website

Marketing site for **Replii** — an AI revenue operator that replies to, qualifies, and routes Meta ad leads from Instagram DMs, Facebook Messenger, and WhatsApp.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion (interactive sections only)
- Lucide React

## Requirements

Node.js 20+ (see `.nvmrc`)

## Environment

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for `metadataBase`, canonical URL, and Open Graph.

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

Primary contact: `info@accellionx.com` via `mailto:` helpers in `lib/constants.ts`.

## TODOs

Set real URLs in `TODO_LINKS` (`lib/constants.ts`) when ready:

- `companyWebsite`
- `privacy`
- `terms`
