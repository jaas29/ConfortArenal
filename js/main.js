/* ========================================
   Hotel Confort Arenal - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Language Switcher
    // ========================================
    const langLinks = document.querySelectorAll('.lang-link');
    langLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.dataset.lang;
            setLanguage(lang);
        });
    });

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.room-card, .amenity, .testimonial, .intro-img, .gallery-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        animateOnScroll.observe(el);
    });
    
    // Add animate-in styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // Gallery Lightbox (for gallery page)
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
            <button class="lightbox-next" aria-label="Next image">&#8250;</button>
            <div class="lightbox-content">
                <img src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => item.querySelector('img').src);
        
        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function showPrev() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex];
        }
        
        function showNext() {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex];
        }
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });
        
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        });
    }
    
    // ========================================
    // Room Images Lightbox (for rooms page)
    // ========================================
    const roomDetailSections = document.querySelectorAll('.room-detail-images');

    if (roomDetailSections.length > 0) {
        // Create lightbox if it doesn't exist (might already exist from gallery)
        let roomLightbox = document.querySelector('.lightbox');

        if (!roomLightbox) {
            roomLightbox = document.createElement('div');
            roomLightbox.className = 'lightbox';
            roomLightbox.innerHTML = `
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                <button class="lightbox-next" aria-label="Next image">&#8250;</button>
                <div class="lightbox-content">
                    <img src="" alt="">
                </div>
            `;
            document.body.appendChild(roomLightbox);
        }

        const lightboxImg = roomLightbox.querySelector('img');
        const closeBtn = roomLightbox.querySelector('.lightbox-close');
        const prevBtn = roomLightbox.querySelector('.lightbox-prev');
        const nextBtn = roomLightbox.querySelector('.lightbox-next');

        let currentRoomImages = [];
        let currentRoomIndex = 0;

        function openRoomLightbox(images, startIndex) {
            currentRoomImages = images;
            currentRoomIndex = startIndex;
            lightboxImg.src = currentRoomImages[currentRoomIndex];
            roomLightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeRoomLightbox() {
            roomLightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function showRoomPrev() {
            currentRoomIndex = (currentRoomIndex - 1 + currentRoomImages.length) % currentRoomImages.length;
            lightboxImg.src = currentRoomImages[currentRoomIndex];
        }

        function showRoomNext() {
            currentRoomIndex = (currentRoomIndex + 1) % currentRoomImages.length;
            lightboxImg.src = currentRoomImages[currentRoomIndex];
        }

        // Set up each room section
        roomDetailSections.forEach(section => {
            const mainImage = section.querySelector('.room-main-image img');
            const thumbImages = section.querySelectorAll('.room-thumb img');

            // Collect all images for this room
            const allImages = [];
            if (mainImage) allImages.push(mainImage.src);
            thumbImages.forEach(img => allImages.push(img.src));

            // Main image click
            if (mainImage) {
                mainImage.style.cursor = 'pointer';
                mainImage.addEventListener('click', () => openRoomLightbox(allImages, 0));
            }

            // Thumbnail clicks
            thumbImages.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => openRoomLightbox(allImages, index + 1));
            });
        });

        // Event listeners (only if not already set by gallery lightbox)
        if (!document.querySelector('.gallery-item')) {
            closeBtn.addEventListener('click', closeRoomLightbox);
            prevBtn.addEventListener('click', showRoomPrev);
            nextBtn.addEventListener('click', showRoomNext);

            roomLightbox.addEventListener('click', (e) => {
                if (e.target === roomLightbox) closeRoomLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (!roomLightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeRoomLightbox();
                if (e.key === 'ArrowLeft') showRoomPrev();
                if (e.key === 'ArrowRight') showRoomNext();
            });
        } else {
            // If gallery lightbox exists, override its functions for room images
            closeBtn.addEventListener('click', closeRoomLightbox);
            prevBtn.addEventListener('click', (e) => {
                if (currentRoomImages.length > 0) {
                    e.stopPropagation();
                    showRoomPrev();
                }
            });
            nextBtn.addEventListener('click', (e) => {
                if (currentRoomImages.length > 0) {
                    e.stopPropagation();
                    showRoomNext();
                }
            });
        }

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        roomLightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        roomLightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;

            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left - next image
                showRoomNext();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right - previous image
                showRoomPrev();
            }
        }, { passive: true });
    }

    // ========================================
    // FAQ Accordion (for contact/about page)
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            const answerId = answer.id || `faq-answer-${index + 1}`;
            answer.id = answerId;
            question.setAttribute('aria-controls', answerId);
            question.setAttribute('aria-expanded', 'false');

            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                    i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });
                
                // Toggle current item
                if (!isOpen) {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
    
    // ========================================
    // Testimonials Slider Auto-play
    // ========================================
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialSlider && window.innerWidth <= 992) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((t, i) => {
                t.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Only auto-play on mobile
        if (window.innerWidth <= 768) {
            showTestimonial(0);
            
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            }, 5000);
        }
    }
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // Translate placeholders
    // ========================================
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            el.placeholder = translations[currentLanguage][key];
        }
    });

    // ========================================
    // GA4 Event Tracking
    // ========================================
    function trackEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
    }

    // Track all "Book Now" / reservation clicks
    document.querySelectorAll('a[href*="cloudbeds.com"]').forEach(link => {
        link.addEventListener('click', function() {
            const label = this.textContent.trim() || 'Book Now';
            const page = window.location.pathname;
            trackEvent('click_book_now', {
                link_text: label,
                page_location: page
            });
        });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('click_whatsapp', {
                page_location: window.location.pathname
            });
        });
    });

    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('click_phone', {
                page_location: window.location.pathname
            });
        });
    });

    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('click_email', {
                page_location: window.location.pathname
            });
        });
    });

    // Track language switch
    document.querySelectorAll('.lang-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('language_switch', {
                language: this.dataset.lang
            });
        });
    });

});
