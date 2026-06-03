/**
 * Cookie Consent Banner
 * Hotel Confort Arenal
 * Bilingual (EN/ES) + strict GA4 opt-in
 */
(function() {
    'use strict';

    const CONSENT_KEY = 'cookie_consent';
    const GA_MEASUREMENT_ID = 'G-2BELG2GGS2';

    function loadAnalytics() {
        if (window.__hotelAnalyticsLoaded) return;
        window.__hotelAnalyticsLoaded = true;

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
        document.head.appendChild(script);

        window.gtag('consent', 'default', {
            analytics_storage: 'granted'
        });
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID);
    }

    var savedConsent = localStorage.getItem(CONSENT_KEY);

    if (savedConsent === 'accepted') {
        loadAnalytics();
        return;
    }

    if (savedConsent === 'declined') {
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
                message: 'Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio.',
                privacy: 'Política de Privacidad',
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

            loadAnalytics();

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
