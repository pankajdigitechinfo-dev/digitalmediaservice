/* ============================================================
   DIGITAL MEDIA SERVICE — script.js
   Owner  : Pro Pankaj Kumar
   Mobile : +91 9286959114
   Email  : digitalmediaservice@gmail.com
   Location: Agra, Uttar Pradesh, India
   ============================================================ */

'use strict';

/* ===================================================
   1. PAGE NAVIGATION (SPA simulation)
   =================================================== */

/**
 * Show a specific page by ID and update nav active state.
 * @param {string} id   - Page element ID (home|about|services|pricing|portfolio|blog|contact)
 * @param {Element} [el] - The nav anchor that was clicked (optional)
 */
function showPage(id, el) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show requested page
  const page = document.getElementById(id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active nav link
  document.querySelectorAll('nav a, .mobile-nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');

  // Re-run reveal after DOM settles
  setTimeout(revealOnScroll, 120);

  // Close mobile nav if open
  closeMobileNav();
}

/* ===================================================
   2. STICKY HEADER
   =================================================== */
function handleHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

/* ===================================================
   3. SCROLL-TO-TOP BUTTON
   =================================================== */
function handleScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===================================================
   4. MOBILE NAVIGATION
   =================================================== */
function toggleMobileNav() {
  const nav       = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  if (!nav) return;
  const isOpen = nav.classList.toggle('open');
  if (hamburger) hamburger.classList.toggle('open', isOpen);
}

function closeMobileNav() {
  const nav       = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  if (!nav) return;
  nav.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
}

/* Close mobile nav when clicking outside */
document.addEventListener('click', (e) => {
  const nav  = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.hamburger');
  if (!nav || !nav.classList.contains('open')) return;
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileNav();
  }
});

/* ===================================================
   5. SCROLL REVEAL
   =================================================== */
function revealOnScroll() {
  const elements = document.querySelectorAll('.page.active .reveal:not(.visible)');
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

/* ===================================================
   6. FAQ ACCORDION
   =================================================== */

/**
 * Toggle a FAQ item open/closed.
 * @param {Element} trigger - The .faq-q element that was clicked
 */
function toggleFaq(trigger) {
  const item   = trigger.parentElement;
  const answer = item.querySelector('.faq-a');
  const wasOpen = item.classList.contains('open');

  // Close all items
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    const a = i.querySelector('.faq-a');
    if (a) a.classList.remove('open');
  });

  // If it was closed, open it
  if (!wasOpen) {
    item.classList.add('open');
    if (answer) answer.classList.add('open');
  }
}

/* ===================================================
   7. PORTFOLIO FILTER
   =================================================== */

/**
 * Filter portfolio cards by category.
 * @param {string}  cat - Category key (all|news|web|ecom|seo)
 * @param {Element} btn - The filter button clicked
 */
function filterPortfolio(cat, btn) {
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide portfolio cards
  document.querySelectorAll('.port-card').forEach(card => {
    const matches = cat === 'all' || card.dataset.cat === cat;
    card.style.display    = matches ? '' : 'none';
    card.style.opacity    = matches ? '1' : '0';
  });
}

/* ===================================================
   8. CONTACT FORM SUBMISSION
   =================================================== */

/**
 * Handle contact form submit with simulated async send.
 * @param {Event} e - Submit event
 */
function submitForm(e) {
  e.preventDefault();

  const form    = e.target;
  const btn     = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  if (!btn) return;

  // Disable button and show spinner
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
  btn.disabled  = true;

  // Simulate network request (replace with real fetch/AJAX call)
  setTimeout(() => {
    btn.style.display = 'none';
    if (success) {
      success.style.display = 'flex';
    }
    form.reset();

    // Auto-reset form after 5 seconds so user can send again
    setTimeout(() => {
      if (success) success.style.display = 'none';
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      btn.disabled  = false;
      btn.style.display = '';
    }, 5000);
  }, 1600);
}

/* ===================================================
   9. HERO PILL ANIMATION
   =================================================== */
function initPillAnimation() {
  const pills = document.querySelectorAll('.pill');
  if (!pills.length) return;

  let idx = 0;

  setInterval(() => {
    pills.forEach(p => p.classList.remove('active'));
    pills[idx % pills.length].classList.add('active');
    pills[(idx + 1) % pills.length].classList.add('active');
    idx++;
  }, 1800);
}

/* ===================================================
   10. COUNTER ANIMATION
   =================================================== */

/**
 * Animate a numeric counter from 0 to its target value.
 * Targets elements with data-count attribute.
 */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target   = parseInt(counter.dataset.count, 10);
    const duration = 1800;
    const step     = target / (duration / 16);
    let   current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + (counter.dataset.suffix || '+');
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + (counter.dataset.suffix || '+');
      }
    }, 16);
  });
}

/* ===================================================
   11. SMOOTH ANCHOR LINKS (within same page)
   =================================================== */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===================================================
   12. TYPED TEXT EFFECT (Hero subtitle)
   =================================================== */
function initTypedEffect() {
  const el = document.querySelector('.hero-typed');
  if (!el) return;

  const phrases = [
    'News Portal Setup',
    'Website Development',
    'SEO Services',
    'Digital Marketing',
    'E-Commerce Stores',
    'Graphic Design',
  ];
  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function type() {
    const current = phrases[phraseIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    if (!deleting && charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
    if (deleting && charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(type, deleting ? 50 : 90);
  }

  type();
}

/* ===================================================
   13. TOOLTIP INIT
   =================================================== */
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const tip     = document.createElement('div');
      tip.className = 'dms-tooltip';
      tip.textContent = el.dataset.tooltip;
      document.body.appendChild(tip);

      const rect = el.getBoundingClientRect();
      tip.style.cssText = `
        position: fixed;
        top: ${rect.top - tip.offsetHeight - 8}px;
        left: ${rect.left + rect.width / 2 - tip.offsetWidth / 2}px;
        background: #0a1628;
        color: #fff;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        z-index: 9999;
        pointer-events: none;
        white-space: nowrap;
        border: 1px solid rgba(255,255,255,0.12);
      `;
    });

    el.addEventListener('mouseleave', () => {
      const tips = document.querySelectorAll('.dms-tooltip');
      tips.forEach(t => t.remove());
    });
  });
}

/* ===================================================
   14. GLOBAL SCROLL HANDLER
   =================================================== */
window.addEventListener('scroll', () => {
  handleHeader();
  handleScrollTop();
  revealOnScroll();
}, { passive: true });

/* ===================================================
   15. INIT ON DOM READY
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Wires scroll-top button click
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
  }

  // Initial state
  handleHeader();
  handleScrollTop();
  revealOnScroll();

  // Feature initializers
  initPillAnimation();
  initSmoothLinks();
  initTypedEffect();
  initTooltips();
});

/* Run reveal after full page load (images, fonts, etc.) */
window.addEventListener('load', () => {
  setTimeout(revealOnScroll, 200);
  animateCounters();
});
