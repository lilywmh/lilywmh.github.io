// Dark/Light mode – run immediately to avoid flash
(function() {
    var root = document.documentElement;
    if (!root) return;
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = (stored === 'dark' || stored === 'light') ? stored : (prefersDark ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);
})();

// Interactive custom cursor (desktop / pointer devices – e.g. Chrome)


  
document.addEventListener('DOMContentLoaded', function() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .nav-toggle, .theme-toggle');

    // Use custom cursor only on pointer devices and when user has not requested reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useCustomCursor = !prefersReducedMotion
        && (window.matchMedia('(hover: hover)').matches || window.matchMedia('(pointer: fine)').matches)
        && cursorDot && cursorRing;

    if (useCustomCursor) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.body.classList.add('using-cursor');

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('cursor-hover');
                cursorRing.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('cursor-hover');
                cursorRing.classList.remove('cursor-hover');
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function updateThemeLabels() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.querySelectorAll('.theme-toggle').forEach(function(btn) {
            btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        });
    }
    updateThemeLabels();

    // Theme toggle: clicking moon = switch to dark, clicking sun = switch to light
    // document.addEventListener('click', function(e) {
    //     var btn = e.target && e.target.closest && e.target.closest('.theme-toggle');
    //     if (!btn) return;
    //     e.preventDefault();
    //     e.stopPropagation();
    //     var root = document.documentElement;
    //     var current = root.getAttribute('data-theme') || 'light';
    //     var next = (current === 'dark') ? 'light' : 'dark';
    //     root.setAttribute('data-theme', next);
    //     localStorage.setItem('theme', next);
    //     updateThemeLabels();
    // });
    // Smooth scrolling for in-page links (instant when user prefers reduced motion)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                });
            }
        });
    });

    // Navbar color change on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Fade-in animation for sections
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Project cards hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });

    // Typing effect for hero section
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const text = heroTagline.textContent;
        heroTagline.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        typeWriter();
    }

    // Mobile menu toggle
    // 1. Mobile Menu Fix
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // Toggle a single class; handle the "X" animation in CSS!
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 2. Theme Toggle Fix (Simplified)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.theme-toggle');
        if (!btn) return;

        const root = document.documentElement;
        const isDark = root.getAttribute('data-theme') === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        root.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        
        // Update aria-label for accessibility
        btn.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light' : 'Switch to dark');
    });
}); 