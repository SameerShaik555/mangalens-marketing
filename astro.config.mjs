import { defineConfig } from 'astro/config';

// Static, fully prerendered marketing site.
// `site` is used for canonical URLs / sitemap; update once the production
// domain is confirmed with the CEO (see README "Deploy path").
export default defineConfig({
  site: 'https://mangalens.app',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
