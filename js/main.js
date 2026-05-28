/* ═══════════════════════════════════════════
   HAPS SOLUTIONS LDA — Main JavaScript v2
   ═══════════════════════════════════════════ */

/* ── PAGE NAVIGATION ── */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.getElementById('nav-' + name);
  if (activeLink) activeLink.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 100);
  if (name === 'home') setTimeout(initCounters, 500);
}

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ── */
function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '-30px' });
  activePage.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) obs.observe(el);
  });
}

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  let count = 0;
  const step = target / 55;
  const timer = setInterval(() => {
    count += step;
    if (count >= target) { el.textContent = target + suffix; clearInterval(timer); }
    else el.textContent = Math.floor(count) + suffix;
  }, 18);
}

function initCounters() {
  document.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
}

/* ── HERO COUNTER (triggered by intersection) ── */
const heroStatObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
      heroStatObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

/* ── FORM ── */
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmessage').value.trim();

  ['fname','femail','fmessage'].forEach(id => {
    document.getElementById(id).style.borderColor = '';
  });

  let valid = true;
  if (!name) { document.getElementById('fname').style.borderColor = '#C8102E'; valid = false; }
  if (!email) { document.getElementById('femail').style.borderColor = '#C8102E'; valid = false; }
  if (!msg) { document.getElementById('fmessage').style.borderColor = '#C8102E'; valid = false; }
  if (!valid) return;

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.innerHTML = `<svg width="16" height="16" style="animation:spin 1s linear infinite" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0"/></svg> Sending...`;

  setTimeout(() => {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1500);
}

function resetForm() {
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('formSuccess').style.display = 'none';
  ['fname','fcompany','femail','fphone','fservice','fmessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.style.borderColor = ''; }
  });
  const btn = document.querySelector('.form-submit');
  btn.disabled = false;
  btn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Inquiry`;
}

/* ── INIT ── */
window.addEventListener('load', () => {
  initReveal();
  // Hero stats observer
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) heroStatObs.observe(heroStats);
});
