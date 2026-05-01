# Deploying InstantTool to Hostinger (Node.js)

This project is a Vite + React SPA wrapped by a tiny Express server
(`server.js`) so it can run on Hostinger's **Node.js** hosting.

## 1. Build locally (optional but recommended)

```bash
npm install
npm run build
```

This produces a `dist/` folder. The Express server serves files from there.

## 2. Upload to Hostinger

Upload **all** project files to your Hostinger app directory, e.g.
`/home/USER/domains/yourdomain.com/instanttool`. Make sure these are included:

- `server.js`
- `package.json` and `package-lock.json` (or `bun.lockb`)
- `dist/` (if you built locally — otherwise it will be built on the server)
- `src/`, `public/`, `index.html`, `vite.config.ts`, `tsconfig*.json`,
  `tailwind.config.ts`, `postcss.config.js` (needed if you let Hostinger build)

You can skip `node_modules/` — Hostinger installs them.

## 3. Configure the Node.js app in hPanel

In **hPanel → Advanced → Node.js**:

| Setting | Value |
|---|---|
| Node.js version | `18.x` or newer (project requires `>=18.18`) |
| Application root | the folder you uploaded to |
| Application URL | your domain / subdomain |
| Application startup file | `server.js` |
| Environment variables | `NODE_ENV=production` (optional: `PORT` is set by Hostinger) |

Click **Create**, then **Run NPM Install**.
The `postinstall` script will also run `vite build` so `dist/` is generated
on the server if you didn't upload it.

Finally, click **Restart**. Your site will be live at the configured URL.

## 4. How routing works

`server.js` serves `dist/` and falls back to `dist/index.html` for any
unknown path (without a file extension). This makes deep links like
`/tool/emi-calculator`, `/blog/<slug>`, and `/category/finance` work on
refresh and direct visits.

## 5. Useful endpoints

- `GET /healthz` → `ok` (use for uptime monitoring)

## 6. Updating the site

```bash
# locally
npm run build
# upload changed files (at minimum the new dist/ folder)
# then in hPanel → Node.js → Restart
```

## 7. Troubleshooting

- **502 / app not starting** → check the Node.js app logs in hPanel.
  Most often it's a missing `dist/` folder. Run `npm run build` on the
  server (hPanel has a terminal) or upload `dist/` manually.
- **404 on refresh** → ensure `server.js` is the startup file, not
  `index.html`. Apache/static hosting will not handle SPA fallback.
- **Old assets cached** → `dist/assets/*` files are hashed and safe to
  cache forever. `index.html` is served with `Cache-Control: no-cache`.
