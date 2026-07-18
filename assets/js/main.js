/* =============================================
   ADVOCATE HARSHIKA PAREEK - MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

    'use strict';

    /* =========================================
       1. PRELOADER
       ========================================= */


    /* =========================================
   DISCLAIMER MODAL - SHOW ONLY ONCE
========================================= */

    // const disclaimerModalEl = document.getElementById('disclaimerModal');

    // if (disclaimerModalEl) {

    //     const accepted = localStorage.getItem('disclaimerAccepted');

    //     if (!accepted) {

    //         const disclaimerModal = new bootstrap.Modal(disclaimerModalEl, {
    //             backdrop: 'static',
    //             keyboard: false
    //         });

    //         disclaimerModal.show();

    //         document.getElementById('disclaimerAgree')?.addEventListener('click', () => {
    //             localStorage.setItem('disclaimerAccepted', 'true');
    //             disclaimerModal.hide();
    //         });

    //         document.getElementById('disclaimerExit')?.addEventListener('click', () => {
    //             window.location.href = 'https://www.google.com';
    //         });
    //     }
    // }

    /* =========================================
       3. STICKY NAVBAR
       ========================================= */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* =========================================
       4. SCROLL PROGRESS BAR
       ========================================= */
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    /* =========================================
       5. COUNTER ANIMATION
       ========================================= */

    function animateCounter(element) {
        const target = parseInt(element.dataset.target);

        if (isNaN(target)) return;

        let current = 0;
        const duration = 2000;
        const increment = target / 60;

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            element.textContent = Math.floor(current);
        }, duration / 60);
    }

    const counterSection = document.querySelector(".stats-section");
    const counters = document.querySelectorAll(".stat-number[data-target]");
    let countersAnimated = false;

    function checkCounters() {
        if (!counterSection || countersAnimated) return;

        const rect = counterSection.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            counters.forEach(counter => animateCounter(counter));
            countersAnimated = true;
        }
    }

    window.addEventListener("scroll", checkCounters);
    window.addEventListener("load", checkCounters);

    /* =========================================
       6. BACK TO TOP BUTTON
       ========================================= */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* =========================================
       7. SWIPER INITIALIZATION
       ========================================= */
    // Workshops Swiper
    const workshopsSwiperEl = document.getElementById('workshopsSwiper');
    if (workshopsSwiperEl && typeof Swiper !== 'undefined') {
        new Swiper('#workshopsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
            },
        });
    }

    // Testimonials Swiper
    const testimonialsSwiperEl = document.getElementById('testimonialsSwiper');
    if (testimonialsSwiperEl && typeof Swiper !== 'undefined') {
        new Swiper('#testimonialsSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1200: { slidesPerView: 3 },
            },
        });
    }

    /* =========================================
       8. LIGHTBOX GALLERY
       ========================================= */
    const lightbox = document.getElementById('lightboxOverlay');
    let currentLightboxIndex = 0;
    let lightboxItems = [];

    function openLightbox(index) {
        const items = document.querySelectorAll('[data-lightbox]');
        lightboxItems = Array.from(items);
        if (lightboxItems.length === 0) return;
        currentLightboxIndex = index;
        showLightboxItem(currentLightboxIndex);
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function showLightboxItem(index) {
        if (!lightbox || lightboxItems.length === 0) return;
        const item = lightboxItems[index];
        const title = item.getAttribute('data-title') || 'Award';
        const subtitle = item.getAttribute('data-subtitle') || '';
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        if (lightboxImage) {
            lightboxImage.innerHTML = '<i class="bi bi-award-fill"></i><span>' + title + '</span>';
        }
        if (lightboxCaption) {
            lightboxCaption.innerHTML = title + (subtitle ? ' &mdash; ' + subtitle : '');
        }
    }

    document.querySelectorAll('[data-lightbox]').forEach(function (item, idx) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            openLightbox(idx);
        });
    });

    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', function () {
            if (lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const lightboxPrev = document.querySelector('.lightbox-nav.prev');
    const lightboxNext = document.querySelector('.lightbox-nav.next');

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function () {
            currentLightboxIndex = (currentLightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
            showLightboxItem(currentLightboxIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function () {
            currentLightboxIndex = (currentLightboxIndex + 1) % lightboxItems.length;
            showLightboxItem(currentLightboxIndex);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.key === 'ArrowLeft' && lightboxPrev) {
            lightboxPrev.click();
        }
        if (e.key === 'ArrowRight' && lightboxNext) {
            lightboxNext.click();
        }
    });

    // Close lightbox on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    /* =========================================
        9. AOS INITIALIZATION (re-init handled in includes.js)
        ========================================= */

    /* =========================================
       10. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    /* =========================================
       11. ACTIVE NAV LINK ON SCROLL
       ========================================= */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length > 0 && sections.length > 0) {
        window.addEventListener('scroll', function () {
            let current = '';
            sections.forEach(function (section) {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /* =========================================
       12. HERO PARTICLES
       ========================================= */
    const particlesContainer = document.querySelector('.hero-particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (1 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    /* =========================================
       13. NAVBAR DROPDOWN CLOSE ON CLICK (MOBILE)
       ========================================= */
    const offcanvasNavLinks = document.querySelectorAll('.offcanvas .nav-link');
    const offcanvasClose = document.querySelector('[data-bs-dismiss="offcanvas"]');

    offcanvasNavLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (offcanvasClose && window.innerWidth < 992) {
                offcanvasClose.click();
            }
        });
    });

});
