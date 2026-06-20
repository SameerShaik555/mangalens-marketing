/**
 * MangaLens — conversion event tracking (privacy-friendly, cookieless).
 * ----------------------------------------------------------------------------
 * Loaded only when ANALYTICS_DOMAIN is set (see Layout.astro). Works with
 * Plausible's manual events API via the window.plausible() queue. Uses no
 * cookies and no personal data — only the click target, its label, and any
 * campaign (UTM) tags present in the landing URL.
 *
 * Conversion goals fired (create these as custom-event goals in Plausible):
 *   - "Install Click"  → primary conversion: any "Add to Chrome" CTA.
 *   - "Discord Click"  → community join CTA.
 *   - "CTA Click"      → any other tracked call-to-action.
 * Each event carries props: { location, label, utm_source?, utm_medium?,
 * utm_campaign?, utm_term?, utm_content? } so the dashboard can break
 * conversions down by placement and campaign.
 * ----------------------------------------------------------------------------
 */
(function () {
  'use strict';

  function track(name, props) {
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props: props });
    }
  }

  /* ---- UTM capture: read once on load, persist for the session ---- */
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var UTM_STORE_KEY = 'ml_utm';

  function captureUtm() {
    try {
      var params = new URLSearchParams(window.location.search);
      var captured = {};
      var found = false;
      UTM_KEYS.forEach(function (k) {
        var v = params.get(k);
        if (v) {
          captured[k] = String(v).slice(0, 120);
          found = true;
        }
      });
      // First-touch wins for the session: don't overwrite an earlier campaign.
      if (found && !sessionStorage.getItem(UTM_STORE_KEY)) {
        sessionStorage.setItem(UTM_STORE_KEY, JSON.stringify(captured));
      }
    } catch (e) {
      /* sessionStorage / URL parsing unavailable — skip silently. */
    }
  }

  function getUtm() {
    try {
      var raw = sessionStorage.getItem(UTM_STORE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  captureUtm();

  /* ---- CTA click tracking ---- */
  var STORE_HOST = 'chromewebstore.google.com';

  function buildProps(el) {
    var props = {
      location: el.getAttribute('data-cta') || 'unknown',
      label: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80),
    };
    var utm = getUtm();
    Object.keys(utm).forEach(function (k) {
      props[k] = utm[k];
    });
    return props;
  }

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target && e.target.closest ? e.target.closest('.js-cta') : null;
      if (!el) return;

      var href = el.getAttribute('href') || '';
      var props = buildProps(el);

      if (href.indexOf(STORE_HOST) !== -1) {
        // Primary conversion goal — the "Add to Chrome" install action.
        track('Install Click', props);
      } else if (href.indexOf('discord') !== -1) {
        track('Discord Click', props);
      } else {
        track('CTA Click', props);
      }
    },
    true // capture phase: fire before any navigation handler.
  );
})();
