/* ============================================================
   AL HAYEN TECHNICAL SERVICES — Main JavaScript
   Animations, Scroll Effects, Form Handling, Counter Animation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navigation Scroll Effect ──────────────────────────────
  const nav = document.querySelector('.nav');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Mobile Menu Toggle ────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth Scroll for Anchor Links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ── Intersection Observer for Reveal Animations ───────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Counter Animation ─────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = performance.now();

    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(target * easedProgress);
      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  // ── Service Category Expand (touch-friendly) ──────────────
  const serviceCategories = document.querySelectorAll('.service-category');
  serviceCategories.forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('a');
      if (link) link.click();
    });
  });

  // ── Contact Form Handling ─────────────────────────────────
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Build WhatsApp message with form data
      const waMessage = encodeURIComponent(
        `Hello Al Hayen Technical Services,\n\n` +
        `My name is ${name}.\n` +
        `Phone: ${phone}\n` +
        `Service needed: ${service}\n` +
        `Message: ${message}\n\n` +
        `I'd like to get a quote. Thank you!`
      );

      window.open(`https://wa.me/971529977026?text=${waMessage}`, '_blank');

      // Show success feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Sent!`;
      submitBtn.style.background = '#1a8754';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ── Parallax-like effect on hero grid pattern ─────────────
  const heroPattern = document.querySelector('.hero-grid-pattern');
  if (heroPattern) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroPattern.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  // ── Active nav link highlight based on scroll ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link[href^="#"]');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(link => {
          link.style.opacity = link.getAttribute('href') === `#${id}` ? '1' : '';
          link.style.fontWeight = link.getAttribute('href') === `#${id}` ? '700' : '';
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Floating WhatsApp tooltip auto-hide ───────────────────
  const tooltip = document.querySelector('.floating-whatsapp-tooltip');
  if (tooltip) {
    setTimeout(() => {
      tooltip.style.transition = 'opacity 0.3s ease';
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 300);
    }, 8000);
  }

  // ── Preload critical images ───────────────────────────────
  const heroImages = document.querySelectorAll('.hero-image-card img');
  heroImages.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });

});
