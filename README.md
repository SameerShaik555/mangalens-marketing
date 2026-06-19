# MangaLens — Marketing Site

The marketing site and landing page for **[MangaLens](https://mangalens.app)**, the AI-powered
Chrome extension that translates manga speech bubbles in real time on any manga website
(65+ languages, one click, zero page reloads).

Built with **[Astro](https://astro.build)** — a static-first framework. The site ships as
plain prerendered HTML/CSS with **zero client-side JavaScript**, so it is extremely fast and
deployable to any static host.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server with hot reload → http://localhost:4321
npm run build      # production build → ./dist
npm run preview    # serve the production build locally
```

Requires Node 20+ (Node 22 verified).

---

## Editing copy (for Marketing / CMO)

**All landing-page copy, links, pricing, and FAQ live in one file:**
[`src/data/content.ts`](src/data/content.ts).

Change the text there, run `npm run build` (or push to the deploy branch), and the site
updates. You do not need to touch any markup. Key things you can edit safely:

- `CHROME_STORE_URL` — the primary conversion target (the "Add to Chrome" link).
- `hero`, `features`, `steps`, `pricing`, `faq`, `finalCta` — all section copy.
- `ANALYTICS_DOMAIN` — set to a Plausible domain (e.g. `mangalens.app`) to turn on
  privacy-friendly, cookieless analytics + outbound-CTA conversion tracking. Leave empty
  to emit no tracking script at all. **No secrets or API keys are required.**

Positioning is **provisional** (pulled from the live product on 2026-06-19). The CMO owns
final messaging — the single-file structure keeps that a low-friction edit.

---

## Project structure

```
src/
  data/content.ts      ← all copy (edit here)
  layouts/Layout.astro ← <head>, SEO/OG meta, global styles, analytics hook
  pages/index.astro    ← landing page sections + section styles
public/                ← favicon.svg, og.svg, robots.txt, sitemap.xml (served as-is)
dist/                  ← build output (generated; not committed)
```

---

## Deploy path

The build output (`dist/`) is fully static. Any of the options below work; **all have a
free tier with no upfront spend.** Connecting a custom domain and/or a paid plan is a
spend/account decision — **coordinate with the CEO before committing to paid hosting or a
domain purchase** (see issue MAN-3 notes).

### Option A — Netlify (config included: `netlify.toml`)
1. Connect this repo in the Netlify dashboard (or `netlify deploy`).
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).
3. Netlify gives an instant `*.netlify.app` preview URL; add the custom domain when ready.

### Option B — Vercel (config included: `vercel.json`)
1. Import the repo in Vercel; it auto-detects Astro.
2. Output directory `dist` (already set in `vercel.json`).
3. Vercel gives a `*.vercel.app` preview URL per push.

### Option C — Cloudflare Pages / GitHub Pages
- Cloudflare Pages: framework preset "Astro", build `npm run build`, output `dist`.
- GitHub Pages: publish the `dist/` artifact via a build action.

Security headers (`X-Content-Type-Options`, `Referrer-Policy`, etc.) are pre-set in the
Netlify and Vercel configs.

### Custom domain
`mangalens.app` is the product's existing domain. Point the marketing site at the chosen
host's DNS target once the CEO confirms domain/registrar access. Update `site` in
`astro.config.mjs` if the marketing site lives on a different hostname/subdomain.

---

## What's instrumented

- **Conversion CTAs**: every "Add to Chrome" / pricing button carries a `data-cta` attribute
  (`hero-primary`, `pricing-yearly`, `final`, etc.) and the `js-cta` class, so click/outbound
  events are attributable once analytics is enabled.
- **SEO/social**: canonical URL, Open Graph + Twitter card meta, `og.svg` share image,
  `robots.txt`, and `sitemap.xml`.
