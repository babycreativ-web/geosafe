// Guard against GSAP failing to load
const gsapActive = typeof gsap !== 'undefined';

if (gsapActive) {
    gsap.registerPlugin(ScrollTrigger);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// Header scroll effect
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 100 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 15px rgba(0,0,0,0.05)';
    });
}

// Loading Screen & Initial Hero Animation
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) { 
        setTimeout(() => { 
            loader.classList.add('hidden'); 
            document.body.classList.remove('loading');
            // Trigger Hero Animation after loader
            initHeroAnimations();
        }, 1500); 
    } else {
        document.body.classList.remove('loading');
        initHeroAnimations();
    }
});

function initHeroAnimations() {
    if (gsapActive) {
        gsap.fromTo(".animate-hero", 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                visibility: "visible",
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power4.out",
                delay: 0.2
            }
        );
    } else {
        document.querySelectorAll('.animate-hero').forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
    }
}

// Professional Scroll Animations
function initScrollAnimations() {
    if (!gsapActive) {
        document.querySelectorAll(".reveal, .animate-text, .service-card, .project-card, .stat-item, .founder-image-wrapper").forEach(el => {
            el.style.opacity = '1';
            el.style.visibility = 'visible';
        });
        return;
    }

    // Reveal Section Headers and Text
    document.querySelectorAll(".reveal, .animate-text").forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                visibility: "visible",
                y: 0,
                duration: 1,
                ease: "power3.out"
            }
        );
    });

    // Staggered Grids (Services, Stats, Portfolio)
    const staggeredSelectors = [".services-grid", ".stats-grid", ".portfolio-grid", ".testimonials-grid"];
    staggeredSelectors.forEach(selector => {
        const grid = document.querySelector(selector);
        if (grid) {
            const children = grid.children;
            gsap.fromTo(children,
                { opacity: 0, y: 40 },
                {
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%"
                    },
                    opacity: 1,
                    visibility: "visible",
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                }
            );
        }
    });

    // Founder Section Specialized Animation
    const founderImg = document.querySelector(".founder-image-wrapper");
    if (founderImg) {
        gsap.fromTo(founderImg,
            { opacity: 0, scale: 0.9, y: 30 },
            {
                scrollTrigger: {
                    trigger: founderImg,
                    start: "top 75%"
                },
                opacity: 1,
                visibility: "visible",
                scale: 1,
                y: 0,
                duration: 1.5,
                ease: "expo.out"
            }
        );
    }
}

// Run animations
initScrollAnimations();

// Animated Counters (GSAP Version)
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (gsapActive) {
            gsap.to(counter, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: "top 90%"
                },
                ease: "power2.inOut"
            });
        } else {
            counter.innerText = target;
        }
    });
}
animateCounters();

// Form Handling
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Demande envoyée avec succès !';
        btn.style.background = 'var(--secondary)';
        btn.disabled = true;
        setTimeout(() => { 
            btn.innerHTML = orig; 
            btn.style.background = ''; 
            btn.disabled = false; 
            this.reset(); 
        }, 3000);
    });
}

// Back to Top Button
const backBtn = document.querySelector('.back-to-top');
if (backBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) { backBtn.classList.add('visible'); }
        else { backBtn.classList.remove('visible'); }
    });
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}
