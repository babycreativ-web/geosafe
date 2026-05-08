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
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 100 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 15px rgba(0,0,0,0.05)';
});

// Scroll Reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Animated Counters
let countersStarted = false;
function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const step = target / 125;
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) { counter.textContent = Math.floor(current); requestAnimationFrame(update); }
            else { counter.textContent = target; }
        };
        requestAnimationFrame(update);
    });
}
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const so = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounters(); so.unobserve(e.target); } });
    }, { threshold: 0.3 });
    so.observe(statsSection);
}

// Form Handling
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const orig = btn.textContent;
        btn.textContent = 'Demande envoyee avec succes !';
        btn.style.background = '#27ae60';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; this.reset(); }, 3000);
    });
}

// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) { setTimeout(() => { loader.classList.add('hidden'); }, 1800); }
});

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
