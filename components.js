// MedAnalytica — Shared Components
const LOGO_SVG = `<img src="HQP-Logo.png" alt="HQP Global Logo" class="logo-svg" style="height:90px;width:auto;object-fit:contain;">`;

const NAV_HTML = `
<nav>
  <a href="index.html" class="nav-logo">
    ${LOGO_SVG}
  </a>
  <ul class="nav-links">
    <li><a href="immune-screen.html">Immune Screen</a></li>
    <li><a href="what-is-hrv.html">HRV</a></li>
    <li><a href="vagal-nerve.html">Vagal Nerve</a></li>
    <li><a href="braingauge.html">BrainGauge™</a></li>
    <li><a href="body-composition.html">Body Comp</a></li>
    <li><a href="mescreen.html">MEScreen™</a></li>
    <li><a href="cell-danger-response.html">CDR</a></li>
    <li><a href="events.html">Events</a></li>
    <li><a href="software.html">Software</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="support.html">Support</a></li>
    <li><a href="purchase.html" class="nav-cta">Purchase</a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">
          ${LOGO_SVG}
        </div>
        <p class="footer-desc">CRIS GOLD™ — the clinical reporting intelligence system bridging Western HRV diagnostics with Eastern medicine parameters. Built by health professionals, for health professionals.</p>
      </div>
      <div>
        <div class="footer-col-head">Platform</div>
        <ul class="footer-links">
          <li><a href="immune-screen.html">HQP Immune Screen</a></li>
          <li><a href="braingauge.html">BrainGauge™</a></li>
          <li><a href="mescreen.html">MEScreen™</a></li>
          <li><a href="body-composition.html">Body Composition</a></li>
          <li><a href="vagal-nerve.html">Vagal Nerve Devices</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-head">Education</div>
        <ul class="footer-links">
          <li><a href="what-is-hrv.html">What is HRV?</a></li>
          <li><a href="cell-danger-response.html">Cell Danger Response</a></li>
          <li><a href="software.html">Software Updates</a></li>
          <li><a href="events.html">Events & Webinars</a></li>
          <li><a href="homeopathy.html">Homeopathy</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-head">Company</div>
        <ul class="footer-links">
          <li><a href="about.html">About Us</a></li>
          <li><a href="purchase.html">Purchase</a></li>
          <li><a href="support.html">Support</a></li>
          <li><a href="http://bb4c8ba4-75ed-4fba-9f3c-fde5c7fcc78c.goaffpro.com/create-account" target="_blank">Affiliate Program</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">© 2024 MedAnalytica · HeartQuest Global, LLC. All rights reserved.</div>
      <div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
        <span style="font-size:12.5px;color:rgba(255,255,255,.35);">+1 (415) 646-6112 · 0861 420 421 (ZA)</span>
        <div class="hipaa-badge">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1L2 3v4c0 3.3 2.1 5.8 5 6.5 2.9-.7 5-3.2 5-6.5V3L7 1z" fill="#3ecf8e" opacity="0.2" stroke="#3ecf8e" stroke-width="1"/><path d="M5 7l1.5 1.5L9 5" stroke="#3ecf8e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          HIPAA Compliant
        </div>
      </div>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navEl = document.getElementById('main-nav');
  if (navEl) navEl.outerHTML = NAV_HTML;

  // Inject footer
  const footerEl = document.getElementById('main-footer');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  // Active nav
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // Fade-in observer
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
});
