# Analytics & Conversion Tracking

Privacy-friendly, cookieless analytics for the MangaLens marketing site. No
cookie banner required (no personal data, no cross-site tracking), GDPR/CCPA/PECR
friendly, and lightweight (~1 KB script).

- **Tool:** [Plausible Analytics](https://plausible.io) (hosted) — cookieless,
  open-source, EU-hosted. Drop-in swappable for self-hosted Plausible or
  [Umami](https://umami.is) since we only use the standard `plausible()` events API.
- **Code:** `src/layouts/Layout.astro` (script tags) + `public/analytics.js`
  (event logic). Copy lives in `src/data/content.ts`.

## Enabling it

Tracking is **off by default** so dev/preview/CI builds emit zero third-party
requests. To turn it on in production:

1. Provision the domain in the Plausible dashboard (add `mangalens.app` as a site).
2. Set the domain in `src/data/content.ts`:
   ```ts
   export const ANALYTICS_DOMAIN = 'mangalens.app';
   ```
3. Build & deploy (`npm run build`). When `ANALYTICS_DOMAIN` is empty, no script
   is injected at all.

No API keys or secrets are required — Plausible identifies the site by the
`data-domain` attribute alone.

## What is tracked

| Signal | Source | Notes |
| --- | --- | --- |
| Pageviews | Plausible core | Path, referrer, country, device, browser. |
| **UTM tags** | Plausible core + `analytics.js` | `utm_source/medium/campaign/term/content`. Auto-shown in the dashboard's "Sources → UTM" tabs; also attached as props to conversion events (see below). |
| Outbound link clicks | `script.outbound-links.js` | Auto-fires `Outbound Link: Click` for any external link. |
| **Conversion events** | `public/analytics.js` | Custom events on CTA clicks — see goals below. |

### Conversion goals (custom events)

`analytics.js` listens for clicks on any `.js-cta` element and fires one of:

| Event name | When | Primary? |
| --- | --- | --- |
| **`Install Click`** | Any "Add to Chrome" CTA (href → Chrome Web Store) | ✅ **Primary conversion** |
| `Discord Click` | Community / Discord CTA | |
| `CTA Click` | Any other tracked CTA | |

Every event carries **props** so conversions can be segmented:

- `location` — placement, from the `data-cta` attribute (`hero-primary`, `header`,
  `how-it-works`, `pricing-monthly`, `pricing-yearly`, `final`, `footer-store`,
  `footer-discord`).
- `label` — the button's visible text.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` — the
  campaign that brought the visitor (first-touch for the session).

> The primary CTA on every page ("Add to Chrome") points at the Chrome Web Store,
> so clicking it fires `Install Click` with `location: "hero-primary"` (or the
> relevant placement). This is the success-condition event for MAN-5.

## Dashboard setup (one-time, in Plausible)

After the domain is live, create these **goals** (Site Settings → Goals → Add goal
→ "Custom event"), typed exactly:

1. `Install Click` — primary conversion. Star it as the headline goal.
2. `Discord Click`
3. `CTA Click`

Optional **funnel** (Plausible Business plan): `Pageview → Install Click` to see
landing-to-install conversion rate.

To break installs down by placement or campaign, open the goal and use the
**Properties** panel → group by `location`, `utm_source`, or `utm_campaign`.

## Verifying events fire

**Locally (no dashboard needed):**

1. Temporarily set `ANALYTICS_DOMAIN = 'mangalens.app'` in `content.ts`.
2. `npm run build && npm run preview`, open the preview URL.
3. Open DevTools → Network, filter `event`. Click "Add to Chrome".
4. You should see a `POST https://plausible.io/api/event` with body
   `{"n":"Install Click","props":{"location":"hero-primary", ...}}`.
   (Add `?utm_source=test&utm_campaign=demo` to the URL to confirm UTM props.)
5. Revert `ANALYTICS_DOMAIN` to `''` unless you're deploying.

A dependency-free unit harness (`scripts/verify-analytics.mjs` style — see the
MAN-5 issue thread) drives `analytics.js` against a DOM stub and asserts the
correct event name + props fire on a simulated CTA click.

**In production:** open the Plausible dashboard → Realtime, click the live site's
CTA, and confirm `Install Click` appears within a few seconds.

## Querying / exporting

- **Dashboard:** realtime + historical, filter by goal and property.
- **Stats API:** `GET https://plausible.io/api/v1/stats/aggregate?site_id=mangalens.app&metrics=events&filters=event:goal==Install%20Click`
  (requires a Plausible API key — store as a deploy/CI secret, never in the repo).
- **CSV export:** dashboard → top-right → "Export".
