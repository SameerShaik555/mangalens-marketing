/**
 * ============================================================================
 *  MangaLens landing-page content — SINGLE SOURCE OF TRUTH for all copy.
 * ============================================================================
 *  Marketing owns this file. To change wording, links, pricing, or FAQ,
 *  edit the values here — no need to touch markup. After editing, run
 *  `npm run build` (or push to the deploy branch) to publish.
 *
 *  NOTE: Copy below is provisional, pulled from the live product as of
 *  2026-06-19. The CMO will finalize positioning. Keep this structure stable
 *  so edits stay a one-file change.
 * ============================================================================
 */

/** Primary conversion target. Update if the store listing URL changes. */
export const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/mangalens/biglphgjknhkeidhapbmlbanfbgleikk';

export const DISCORD_URL = 'https://discord.gg/DynuMR77dZ'; // Confirmed against live mangalens.app (2026-06-19)

/**
 * Analytics: set to a Plausible-compatible domain to enable privacy-friendly,
 * cookieless tracking + CTA conversion events. Leave empty to disable (no
 * tracking script is emitted, no third-party requests). No secrets required.
 */
export const ANALYTICS_DOMAIN = ''; // e.g. 'mangalens.app'

export const site = {
  name: 'MangaLens',
  domain: 'mangalens.app',
  tagline: 'AI Manga Translator for Chrome',
  description:
    'MangaLens translates manga speech bubbles in real-time on any manga website. One click, 65+ languages, zero page reloads. Add to Chrome free.',
};

export const hero = {
  eyebrow: 'AI-Powered Manga Translation',
  headline: 'Read Manga In Your Language',
  subhead:
    'AI-powered translation of speech bubbles in real-time on any manga website. One click, 65+ languages, zero page reloads.',
  primaryCta: { label: 'Add to Chrome — 200 Free Translations', href: CHROME_STORE_URL },
  secondaryCta: { label: 'See How It Works', href: '#how-it-works' },
  // Trust nudges shown under the hero CTA.
  microtrust: ['No account needed to start', '200 free translations', 'Cancel anytime'],
};

export const stats = [
  { value: '65+', label: 'Languages' },
  { value: '1-click', label: 'Whole-page translate' },
  { value: '100s', label: 'Manga sites supported' },
  { value: '0', label: 'Images stored' },
];

export const features = [
  {
    icon: '⚡',
    title: 'AI Real-Time Translation',
    body: 'Our AI translates every speech bubble on the page instantly with a single click — no copy-pasting, no external tabs.',
  },
  {
    icon: '🎯',
    title: 'AI Bubble Detection',
    body: 'Advanced AI automatically finds speech bubbles in manga panels — even hand-drawn and irregular shapes.',
  },
  {
    icon: '🌐',
    title: '65+ Languages',
    body: 'Translate to English, Japanese, Korean, Chinese, Spanish, French, Arabic, Hindi, and many more.',
  },
  {
    icon: '🧩',
    title: 'Works Everywhere',
    body: 'Compatible with any manga website — MangaDex, Rawkuma, Comic Days, Webtoon, and hundreds more.',
  },
  {
    icon: '🖼️',
    title: 'Clean AI Overlays',
    body: 'AI-generated translations appear over the original text seamlessly. Clear them anytime to see the original art.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    body: 'Images are processed on our secure server and never stored. Your reading history stays private.',
  },
];

export const steps = [
  {
    n: 1,
    title: 'Add to Chrome',
    body: 'Install the free extension in seconds. Works on Chrome, Edge, Brave, Arc, Opera, and Vivaldi.',
  },
  {
    n: 2,
    title: 'Open any manga page',
    body: 'Head to your favorite manga site — MangaDex, Rawkuma, Webtoon, and hundreds more are supported.',
  },
  {
    n: 3,
    title: 'Click to translate',
    body: 'One click overlays AI translations on every speech bubble. No reloads, no tabs — just read.',
  },
];

export const supportedSites = [
  'MangaDex',
  'Webtoon',
  'Comic Days',
  'Rawkuma',
  'MangaPlus',
  'Bato.to',
];

export const testimonial = {
  quote:
    'Absolutely love this tool! It makes reading manga online so much easier and more enjoyable 💕',
  source: '5-star Chrome Web Store review',
};

export const pricing = {
  freeNote: 'Start free with 200 translations — no account required.',
  plans: [
    {
      name: 'Monthly',
      price: '$4.99',
      period: '/month',
      cta: { label: 'Get Monthly', href: CHROME_STORE_URL },
      highlight: false,
      perks: ['Unlimited translations', 'All 65+ languages', 'Every supported site'],
    },
    {
      name: 'Yearly',
      price: '$49.99',
      period: '/year',
      badge: 'Save 17%',
      cta: { label: 'Get Yearly', href: CHROME_STORE_URL },
      highlight: true,
      perks: ['Everything in Monthly', '2 months free', 'Cancel anytime'],
    },
  ],
};

export const faq = [
  {
    q: 'Which browsers are supported?',
    a: 'MangaLens works on Chrome and all Chromium-based browsers, including Edge, Brave, Arc, Opera, and Vivaldi.',
  },
  {
    q: 'Does it work on any manga website?',
    a: 'Yes. MangaLens detects and translates speech bubbles on virtually any manga site — MangaDex, Rawkuma, Comic Days, Webtoon, MangaPlus, Bato.to, and hundreds more.',
  },
  {
    q: 'How accurate are the AI translations?',
    a: 'MangaLens uses modern AI OCR and translation to deliver fast, readable translations across 65+ languages, including hand-drawn and irregular speech bubbles.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Images are processed on our secure server and are never stored, and your reading history stays private.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Absolutely — you can cancel anytime. You also get 200 free translations to try MangaLens before subscribing.',
  },
];

export const finalCta = {
  headline: 'Start reading manga in your language today',
  subhead: 'Add MangaLens to Chrome and translate your first 200 bubbles free.',
  cta: { label: 'Add to Chrome — Free', href: CHROME_STORE_URL },
};
