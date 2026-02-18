/* =====================================================
   Lanka Auto Parts & Repairs — Shared JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Nav Toggle ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Header Scroll Effect ──
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Scroll-to-Top Button ──
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Animate on Scroll ──
  const animateEls = document.querySelectorAll('.animate-on-scroll');
  if (animateEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animateEls.forEach(el => observer.observe(el));
  }



  // ── Tabs (Services Page) ──
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      // Deactivate all
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      // Activate target
      btn.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });

  // ── Contact Form Handling ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const subject = document.getElementById('c-subject').value.trim() || 'Website Contact Inquiry';
      const message = document.getElementById('c-message').value.trim();

      if (!name || !email || !message) return;

      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:gothraaservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      showNotification('Opening your email client...');
      contactForm.reset();
    });
  }

  // ── Parallax Effect ──
  const parallaxEl = document.querySelector('.hero-bg');
  if (parallaxEl) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      parallaxEl.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, 0, target, 2000, suffix);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }
});

function animateCounter(el, start, end, duration, suffix) {
  const range = end - start;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.floor(start + range * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function showNotification(message) {
  let notif = document.querySelector('.notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.classList.add('show');
  setTimeout(() => notif.classList.remove('show'), 4000);
}
