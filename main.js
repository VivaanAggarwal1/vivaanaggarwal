
// main.js - fixed reveal animation + interactions
document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Copy email handlers
  const copy = txt => {
    if (!navigator.clipboard) {
      const ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); flash('Email copied'); } catch(e) {}
      ta.remove(); return;
    }
    navigator.clipboard.writeText(txt).then(()=> flash('Email copied'));
  };
  document.getElementById('copyEmail')?.addEventListener('click', () => copy(document.getElementById('email')?.textContent.trim()));
  document.getElementById('copyEmail2')?.addEventListener('click', () => copy(document.getElementById('email2')?.textContent.trim()));

  // Print / Save as PDF
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());

  // small flash message
  function flash(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style,{position:'fixed',right:'20px',bottom:'28px',background:'rgba(0,0,0,0.72)',color:'#fff',padding:'10px 14px',borderRadius:'10px',zIndex:9999,transition:'opacity .4s'});
    document.body.appendChild(el);
    setTimeout(()=> el.style.opacity = 0,1400);
    setTimeout(()=> el.remove(),2000);
  }

  // ---------- Reveal animation (fixed + stagger) ----------
  const revealSelector = '.card, .glass, .profile, .badge';
  const reveals = Array.from(document.querySelectorAll(revealSelector));

  // add baseline 'reveal' class so CSS initial state is applied immediately
  reveals.forEach((el, idx) => {
    el.classList.add('reveal');
    // store index for stagger timing
    el.dataset.revealIndex = String(idx);
  });

  // IntersectionObserver to add 'visible' when element comes into view
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const idx = Number(el.dataset.revealIndex || 0);
        // stagger: 80ms * index but clamp so it's subtle
        const delay = Math.min(80 * idx, 420);
        setTimeout(() => {
          el.classList.add('visible');
        }, delay);
        // once revealed, stop observing (prevents repeated triggers)
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '-10% 0% -20% 0%' });

  // observe
  reveals.forEach(r => io.observe(r));

  // ---------- Nav highlight (unchanged) ----------
  const sectionIds = ['about','achievements','projects','competitions','courses','skills','contact'];
  const navLinks = Array.from(document.querySelectorAll('.nav .nav-link'));
  const targets = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  const navIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(n => n.classList.remove('active'));
        const a = navLinks.find(l => l.getAttribute('href') === '#' + entry.target.id);
        a?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.12 });

  targets.forEach(t => navIo.observe(t));

  // set year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
});
