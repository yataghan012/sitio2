/**
 * lang.js — Bilingual (ES / EN) switcher
 * Default language: Spanish (ES)
 * Preference is persisted in localStorage so it survives page navigation.
 *
 * Markup convention:
 *   Add  data-es="Texto en español"  data-en="Text in English"
 *   on every element whose text content should change.
 *   Optionally add  data-es-html / data-en-html  for innerHTML (when the
 *   content contains HTML tags like <br>).
 */

(function () {
    var STORAGE_KEY = 'sitio2-lang';

    /* ── helpers ──────────────────────────────────────────────────── */

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || 'es';
    }

    function setLang(lang) {
        localStorage.setItem(STORAGE_KEY, lang);
    }

    function applyLang(lang) {
        // Plain-text nodes
        document.querySelectorAll('[data-es][data-en]').forEach(function (el) {
            el.textContent = (lang === 'en') ? el.dataset.en : el.dataset.es;
        });

        // HTML nodes (content with tags)
        document.querySelectorAll('[data-es-html][data-en-html]').forEach(function (el) {
            el.innerHTML = (lang === 'en') ? el.dataset.enHtml : el.dataset.esHtml;
        });

        // Sync every toggle on the page (in case multiple pages share the header)
        document.querySelectorAll('.lang-toggle__input').forEach(function (cb) {
            cb.checked = (lang === 'en');
        });

        // Update <html lang>
        document.documentElement.lang = (lang === 'en') ? 'en' : 'es';
    }

    /* ── init ─────────────────────────────────────────────────────── */

    function init() {
        var lang = getLang();
        applyLang(lang);

        // Attach listener to any toggle on this page
        document.querySelectorAll('.lang-toggle__input').forEach(function (cb) {
            cb.addEventListener('change', function () {
                var newLang = cb.checked ? 'en' : 'es';
                setLang(newLang);
                applyLang(newLang);
            });
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
