import { defineConfig } from 'astro/config';

// Static, fully prerendered marketing site.
// `site` is used for canonical URLs / sitemap. Production marketing domain
// confirmed by CEO on MAN-10: get.mangalens.app (subdomain; live product keeps
// the apex). Until DNS is wired the host serves the same build at its default
// *.pages.dev URL — canonical URLs intentionally point at the final domain.
export default defineConfig({
  site: 'https://get.mangalens.app',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});
