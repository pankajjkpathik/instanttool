# Deploying InstantTool to Hostinger (fixes 503 error)

A 503 on Hostinger shared hosting almost always means Apache could not find/serve `index.html`, or the SPA refresh broke routing. Follow these steps exactly.

## 1. Build the project locally
```bash
npm install
npm run build
```
This creates a `dist/` folder containing `index.html`, `assets/`, `.htaccess`, etc.

## 2. Upload the **contents** of `dist/` (not the folder itself)
1. Open Hostinger → **hPanel → File Manager**.
2. Go into `public_html/`.
3. **Delete** the default `default.php` / `index.html` placeholder that Hostinger creates.
4. Upload **everything inside `dist/`** directly into `public_html/`.
   - ✅ Correct: `public_html/index.html`, `public_html/assets/...`, `public_html/.htaccess`
   - ❌ Wrong:  `public_html/dist/index.html` (this causes 503/404)

> Tip: zip the contents of `dist/`, upload the zip, then "Extract" inside `public_html`.

## 3. Make sure `.htaccess` is visible
In File Manager click **Settings (⚙) → Show hidden files**. You must see `.htaccess` inside `public_html/`. This file is shipped automatically from `public/.htaccess` on every build.

## 4. Clear Hostinger + browser cache
- hPanel → **Advanced → Cache Manager → Purge All**.
- Hard-refresh the site (Ctrl+F5).

## 5. If you still see 503
Check **hPanel → Advanced → Error Logs**. The most common causes:
| Cause | Fix |
|---|---|
| PHP version conflict | hPanel → Advanced → PHP Configuration → set PHP 8.1+ (any modern PHP works, the site is static). |
| Hotlink protection ON | hPanel → Security → disable Hotlink Protection while testing. |
| Domain not pointed | hPanel → Domains → confirm the domain points to this hosting plan. |
| Old `dist/` folder uploaded | Re-upload the **contents** of `dist/`, not the folder. |
| `.htaccess` missing | Re-upload `.htaccess` from `dist/.htaccess`. |

That's it — the site should load and deep links like `/tool/emi-calculator` will work on refresh.
