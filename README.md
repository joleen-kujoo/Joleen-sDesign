# Joleen — Portfolio

React + Vite portfolio site.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy (Cloudflare Pages)

**Dashboard (recommended):** [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) → **Create** → **Pages** → **Connect to Git** → repo `Joleen-sDesign`.

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| Build output | `dist` |
| Environment | `NODE_VERSION=22` |

SPA routing uses `public/_redirects`. Local preview of the production build: `npm run build && npm run preview`.

**CLI:** `npm run build && npx wrangler pages deploy dist --project-name=joleen-portfolio` (after `npx wrangler login`).

**GitHub Actions:** add repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; pushes to `main` deploy via `.github/workflows/deploy.yml`.

On macOS you can run **`部署网站.command`** for step-by-step instructions in Chinese.
