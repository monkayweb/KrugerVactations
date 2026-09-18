# Vercel deployment

This is a server-rendered TanStack Start site, not a static Vite SPA. Nitro generates Vercel Build Output API artifacts with a Node.js server function and static assets.

## Project settings

The repository contains Vercel configuration for both supported root settings:

- Repository root: leave Root Directory empty. Root vercel.json installs/builds in app/ and copies the generated .vercel output to the repository root.
- App root: set Root Directory to app. app/vercel.json uses the TanStack Start framework and builds directly there.

Remove any dashboard Output Directory override such as dist or dist/client. Use Node.js 22.x. Redeploy after pulling the latest main commit. No environment secrets are required for the public site.

## Local checks

From app/:

```sh
bun install --frozen-lockfile
bun run typecheck
VERCEL=1 bun run build
```

Expected files: .vercel/output/config.json, .vercel/output/static/ and .vercel/output/functions/__server.func/index.mjs.

The generated function was exercised locally: homepage returns HTML 200 with site content/logo, an existing walkthrough clip returns video/mp4 200, and an unknown clip returns 404.
