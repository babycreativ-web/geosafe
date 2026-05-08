document.addEventListener('DOMContentLoaded', () => {
    // Header shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            header.style.padding = '0';
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.service-card, .project-card, .section-header, .lab-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Form submission (UI only)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Merci ! Votre demande a été envoyée avec succès. L\'équipe GEOSAFE vous contactera sous 24h.');
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
                form.reset();
            }, 2000);
        });
    }
});
