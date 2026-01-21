/**
 * Cookie Consent Banner
 * Hotel Confort Arenal
 */
(function() {
    'use strict';

    const CONSENT_KEY = 'cookie_consent';

    // Check if consent already given
    if (localStorage.getItem(CONSENT_KEY)) {
        return;
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCookieBanner);
    } else {
        initCookieBanner();
    }

    function initCookieBanner() {
        // Create banner HTML
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <div class="cookie-content">
                <p>
                    We use cookies to enhance your experience on our website.
                    By continuing to browse, you agree to our use of cookies.
                </p>
                <div class="cookie-buttons">
                    <button class="btn btn-primary cookie-accept">Accept</button>
                    <button class="btn btn-secondary cookie-decline">Decline</button>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(banner);

        // Handle accept
        banner.querySelector('.cookie-accept').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'accepted');
            localStorage.setItem(CONSENT_KEY + '_date', new Date().toISOString());
            closeBanner();
        });

        // Handle decline
        banner.querySelector('.cookie-decline').addEventListener('click', function() {
            localStorage.setItem(CONSENT_KEY, 'declined');
            closeBanner();
        });

        function closeBanner() {
            banner.classList.add('hidden');
            setTimeout(() => banner.remove(), 300);
        }
    }
})();
