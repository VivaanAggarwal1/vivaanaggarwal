// Interactions + subtle reveal animations
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

  // Copy email buttons
  const copy = txt => navigator.clipboard?.writeText(txt).then(()=> flash('Email copied'));
  document.getElementById('copyEmail')?.addEventListener('click', () => copy(document.getElementById('email')?.textContent.trim()));
  document.getElementById('copyEmail2')?.addEventListener('click', () => copy(document.getElementById('email2')?.textContent.trim()));

  // Print / PDF
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());

  // small flash message
  function flash(msg){
    const el = document.createElement('div');
    el.textContent = msg;
    Object.assign(el.style,{position:'fixed',right:'20px',bottom:'28px',background:'rgba(0,0,0,0.7)',color:'#fff',padding:'10px 14px',borderRadius:'10px',zIndex:9999});
    document.body.appendChild(el);
    setTimeout(()=> el.style.opacity = 0,1600);
    setTimeout(()=> el.remove(),2200);
  }

  // IntersectionObserver reveal
  const reveals = document.querySelectorAll('.card, .glass, .profile, .badge');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible', 'reveal');
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => io.observe(r));

  // nav highlight
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
