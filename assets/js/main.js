document.addEventListener('DOMContentLoaded', () => {

    // ── Mark body as JS-ready (enables scroll reveal) ───
    document.body.classList.add('js-ready');

    // ── Scroll: add border to navbar when page scrolls ──
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    });

    // ── Hamburger: toggle mobile menu ───────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
    });

    // ── Mobile menu: close when a link is tapped ────────
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });

    // ── Light / Dark mode toggle ─────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = themeToggle.querySelector('.theme-icon');
    const htmlEl      = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? 'dark_mode' : 'light_mode';
    }

    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeIcon.textContent = next === 'dark' ? 'dark_mode' : 'light_mode';
    });

    // ── Footer: auto year ───────────────────────────────
    document.getElementById('currentYear').textContent = new Date().getFullYear();

});