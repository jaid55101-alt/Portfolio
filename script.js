const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.nav-menu');
const toast = document.querySelector('.toast');
let toastTimer;

function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteMenu.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    siteMenu.classList.toggle('is-open', !isOpen);
});

siteMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelectorAll('.placeholder-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const projectName = link.dataset.project;
        toast.textContent = `Add the ${projectName} project URL here when it is published.`;
        toast.classList.add('is-visible');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
    });
});
