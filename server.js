// Production Node.js server for Hostinger (or any Node host).
// Serves the Vite-built SPA from `dist/` with proper SPA fallback,
// gzip compression, long-term asset caching, and HTML no-cache.
//
// Start with: `npm run start` (after `npm run build`).
// Hostinger Node.js app: set "Application startup file" to `server.js`.

import express from "express";
import compression from "compression";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const DIST_DIR = path.join(__dirname, "dist");
const INDEX_HTML = path.join(DIST_DIR, "index.html");

if (!fs.existsSync(INDEX_HTML)) {
  console.error(
    "[server] dist/index.html not found. Run `npm run build` before starting the server."
  );
  process.exit(1);
}

app.disable("x-powered-by");
app.use(compression());

// Health check (useful on Hostinger / uptime monitors)
app.get("/healthz", (_req, res) => res.status(200).send("ok"));

// Hashed assets get long-term caching; everything else short cache.
app.use(
  express.static(DIST_DIR, {
    index: false,
    etag: true,
    lastModified: true,
    maxAge: "1h",
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  })
);

// SPA fallback — every non-file route returns index.html so React Router
// can handle deep links like /tool/emi-calculator, /blog/..., /category/...
app.get(/.*/, (req, res, next) => {
  // If the request looks like a file (has an extension) and wasn't found
  // by express.static above, return 404 instead of the SPA shell.
  if (path.extname(req.path)) return next();
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(INDEX_HTML);
});

app.use((_req, res) => res.status(404).send("Not found"));

app.listen(PORT, HOST, () => {
  console.log(`[server] InstantTool listening on http://${HOST}:${PORT}`);
});
