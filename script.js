// Modern small interactions: mobile nav toggle, scroll spy, and intersection animations
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  navToggle && navToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // allow default scroll
      document.querySelector('.nav')?.classList.remove('open');
      document.querySelector('.nav-toggle')?.setAttribute('aria-expanded','false');
    });
  });

  // Smooth scroll for internal links (extra for older browsers)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          const offset = 72; // header height
          const top = target.getBoundingClientRect().top + window.scrollY - offset + 6;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // Scroll spy: highlight active nav link
  const sections = document.querySelectorAll('main .section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScrollSpy() {
    let index = sections.length;
    while(--index && window.scrollY + 90 < sections[index].offsetTop) {}
    navLinks.forEach((link) => link.classList.remove('active'));
    const id = sections[index] ? sections[index].id : 'home';
    const active = document.querySelector('.nav a[href="#' + id + '"]');
    active && active.classList.add('active');
  }
  onScrollSpy();
  window.addEventListener('scroll', onScrollSpy, { passive: true });

  // Intersection Observer for reveal animations
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // optionally unobserve to improve performance
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up, .slide-up, .slide-left, .hero-card, .hero-text, .project-card, .about-card, .skills-preview, .contact-form, .contact-info')
    .forEach(el => io.observe(el));
});