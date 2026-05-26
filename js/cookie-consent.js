/**
 * Cookie Consent Banner
 * Hotel Confort Arenal
 * Bilingual (EN/ES) + GA4 consent mode
 */
(function() {
    'use strict';

    const CONSENT_KEY = 'cookie_consent';

    // Configure GA4 consent defaults (denied until user accepts)
    if (typeof gtag === 'function') {
        gtag('consent', 'default', {
            'analytics_storage': 'denied'
        });

        // If previously accepted, grant immediately
        if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    // Don't show banner if consent already given
    if (localStorage.getItem(CONSENT_KEY)) {
        return;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }

    function initCookieBanner() {
        var lang = localStorage.getItem('language') || 'en';

        var text = {
            en: {
                message: 'We use cookies to improve your experience and analyze site traffic.',
                privacy: 'Privacy Policy',
                accept: 'Accept',
                decline: 'Decline'
            },
            es: {
                message: 'Usamos cookies para mejorar tu experiencia y analizar el trafico del sitio.',
                privacy: 'Politica de Privacidad',
                accept: 'Aceptar',
                decline: 'Rechazar'
            }
        };

        var t = text[lang] || text.en;

        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML =
            '<div class="cookie-content">' +
                '<p>' + t.message +
                    ' <a href="pages/privacy.html" class="cookie-privacy-link">' + t.privacy + '</a>' +
                '</p>' +
                '<div class="cookie-buttons">' +
                    '<button class="btn btn-primary cookie-accept">' + t.accept + '</button>' +
                    '<button class="btn btn-secondary cookie-decline">' + t.decline + '</button>' +
                '</div>' +
            '</div>';

        // Fix privacy link path for subpages
        if (window.location.pathname.includes('/pages/')) {
            banner.querySelector('.cookie-privacy-link').href = 'privacy.html';
        }

        document.body.appendChild(banner);

        banner.querySelector('.cookie-accept').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            localStorage.setItem(CONSENT_KEY + '_date', new Date().toISOString());

            // Grant GA4 analytics consent
            if (typeof gtag === 'function') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }

            closeBanner();
        });

        banner.querySelector('.cookie-decline').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'declined');
            closeBanner();
        });

        function closeBanner() {
            banner.classList.add('hidden');
            setTimeout(function() { banner.remove(); }, 300);
        }
    }
})();
