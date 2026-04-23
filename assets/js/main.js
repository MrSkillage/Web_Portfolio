document.addEventListener('DOMContentLoaded', () => {

// ============ Utilities ============ //

    // Mark body as JS-ready (enables scroll reveal)
    document.body.classList.add('js-ready');

// ============ Navigation ============ //
    // Scroll: add border to navbar when page scrolls
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    // Hamburger: toggle mobile menu 
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
    });

    // Mobile menu: close when a link is tapped
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

// ============ Light / Dark Mode ============ //
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = themeToggle.querySelector('.theme-icon');
    const htmlEl      = document.documentElement;

    const themeCallout = document.getElementById('themeCallout');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
        if (savedTheme === 'dark') themeCallout.classList.add('hidden');
    } else {
        themeIcon.textContent = 'light_mode';
    }

    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeIcon.textContent = next === 'dark' ? 'dark_mode' : 'light_mode';

        if (next === 'dark') {
            themeCallout.classList.add('hidden');
        } else {
            themeCallout.classList.remove('hidden');
        }
    });

    // ── Callout: fade when hero code block scrolls out of view ──
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        new IntersectionObserver((entries) => {
            themeCallout.classList.toggle('faded', !entries[0].isIntersecting);
        }, { threshold: 0 }).observe(heroVisual);
    }

// ============ Scroll Reveal ============ //
    const revealEls = document.querySelectorAll(
        '.reveal, .reveal-child, .experience-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0, 
        rootMargin: '0px 0px -150px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveNavLink() {
        const viewportMid = window.innerHeight / 2;
        let closest = null;
        let closestDist = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const dist = Math.abs((rect.top + rect.height / 2) - viewportMid);
            if (dist < closestDist) {
                closestDist = dist;
                closest = section;
            }
        });

        if (closest) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${closest.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    }

    window.addEventListener('scroll', setActiveNavLink, { passive: true });
    setActiveNavLink();
    
// ============ Footer: auto year ============ //
    document.getElementById('currentYear').textContent = new Date().getFullYear();

});