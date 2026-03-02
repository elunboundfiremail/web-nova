/* Web-Nova - Static JS (no libraries) */

(function () {
  const nav = document.querySelector('.nav');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const mobileLinks = document.querySelectorAll('[data-mobile-menu] a');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  function toggleMobileMenu() {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn?.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // swap icon
    const iconOpen = menuBtn?.querySelector('[data-icon="open"]');
    const iconClose = menuBtn?.querySelector('[data-icon="close"]');
    if (iconOpen && iconClose) {
      iconOpen.style.display = isOpen ? 'none' : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn?.addEventListener('click', toggleMobileMenu);
  mobileLinks.forEach(a => a.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('open')) toggleMobileMenu();
  }));

  // Create background particles
  const particleRoot = document.querySelector('[data-particles]');
  if (particleRoot) {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dur = 10 + Math.random() * 10;
      const delay = Math.random() * 10;
      const opacity = 0.2 + Math.random() * 0.5;
      p.style.left = left + '%';
      p.style.top = top + '%';
      p.style.animationDuration = dur + 's';
      p.style.animationDelay = delay + 's';
      p.style.setProperty('--start-opacity', String(opacity));
      particleRoot.appendChild(p);
    }
  }

  // Contact form: simple front-end behavior (no backend)
  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const msg = String(fd.get('message') || '').trim();

    // Minimal validation
    if (!name || !email || !msg) {
      alert('Completa nombre, email y mensaje.');
      return;
    }

    // Mailto fallback
    const subject = encodeURIComponent('Solicitud de proyecto - Web-Nova');
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${msg}`);
    window.location.href = `mailto:k4rn3r0@gmail.com?subject=${subject}&body=${body}`;
  });
})();
