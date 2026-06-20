/**
 * Dependency-free verification for public/analytics.js.
 * ----------------------------------------------------------------------------
 * Runs the real analytics.js inside a minimal DOM/Plausible stub (node:vm),
 * simulates CTA clicks, and asserts the correct conversion events + props fire
 * — including UTM capture. Proves "events fire" without a browser or a live
 * Plausible backend.
 *
 *   node scripts/verify-analytics.mjs
 *
 * Exit code 0 = all assertions passed, 1 = failure.
 */
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'public', 'analytics.js'), 'utf8');

/** Build a fresh sandbox + load analytics.js. Returns helpers for the test. */
function loadAnalytics({ search = '' } = {}) {
  const calls = [];
  const store = new Map();
  let clickHandler = null;

  const sandbox = {
    URLSearchParams,
    Object,
    String,
    console,
    window: {
      location: { search },
      plausible: (name, opts) => calls.push({ name, props: opts && opts.props }),
    },
    document: {
      addEventListener: (type, handler) => {
        if (type === 'click') clickHandler = handler;
      },
    },
    sessionStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
  };

  runInContext(src, createContext(sandbox));

  // Simulate a click on a `.js-cta` element.
  const click = ({ dataCta, href, text }) => {
    const el = {
      getAttribute: (a) => (a === 'data-cta' ? dataCta : a === 'href' ? href : null),
      textContent: text,
    };
    el.closest = (sel) => (sel === '.js-cta' ? el : null);
    clickHandler({ target: el });
  };

  return { calls, click };
}

let failures = 0;
function check(label, cond, detail) {
  if (cond) {
    console.log(`  PASS  ${label}`);
  } else {
    failures++;
    console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

const STORE = 'https://chromewebstore.google.com/detail/mangalens/biglphgjknhkeidhapbmlbanfbgleikk';
const DISCORD = 'https://discord.gg/DynuMR77dZ';

console.log('Primary CTA (Add to Chrome) with UTM tags:');
{
  const { calls, click } = loadAnalytics({
    search: '?utm_source=newsletter&utm_medium=email&utm_campaign=launch',
  });
  click({ dataCta: 'hero-primary', href: STORE, text: '⚡ Add to Chrome — 200 Free Translations' });
  const ev = calls[0] || {};
  check('fires "Install Click"', ev.name === 'Install Click', JSON.stringify(ev));
  check('location prop = hero-primary', ev.props && ev.props.location === 'hero-primary');
  check('captures utm_source', ev.props && ev.props.utm_source === 'newsletter');
  check('captures utm_campaign', ev.props && ev.props.utm_campaign === 'launch');
  check('captures button label', ev.props && /Add to Chrome/.test(ev.props.label || ''));
}

console.log('Discord CTA (no UTM):');
{
  const { calls, click } = loadAnalytics();
  click({ dataCta: 'footer-discord', href: DISCORD, text: '💬 Join Discord' });
  const ev = calls[0] || {};
  check('fires "Discord Click"', ev.name === 'Discord Click', JSON.stringify(ev));
  check('no utm props when none present', ev.props && ev.props.utm_source === undefined);
}

console.log('Generic / internal CTA:');
{
  const { calls, click } = loadAnalytics();
  click({ dataCta: 'misc', href: 'https://example.com/blog', text: 'Read more' });
  check('fires "CTA Click"', (calls[0] || {}).name === 'CTA Click', JSON.stringify(calls[0]));
}

console.log('Pricing CTA also counts as install conversion:');
{
  const { calls, click } = loadAnalytics({ search: '?utm_source=reddit' });
  click({ dataCta: 'pricing-yearly', href: STORE, text: 'Get Yearly' });
  const ev = calls[0] || {};
  check('fires "Install Click"', ev.name === 'Install Click');
  check('location prop = pricing-yearly', ev.props && ev.props.location === 'pricing-yearly');
  check('utm_source carried through', ev.props && ev.props.utm_source === 'reddit');
}

console.log('');
if (failures) {
  console.error(`✗ ${failures} assertion(s) failed.`);
  process.exit(1);
}
console.log('✓ All analytics conversion-tracking assertions passed.');
