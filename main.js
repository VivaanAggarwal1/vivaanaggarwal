document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Copy email
  const copyText = text => {
    navigator.clipboard?.writeText(text).then(() => alert('Email copied!'));
  };
  document.getElementById('copyEmail')?.addEventListener('click', () =>
    copyText(document.getElementById('email').textContent.trim())
  );
  document.getElementById('copyEmail2')?.addEventListener('click', () =>
    copyText(document.getElementById('email2').textContent.trim())
  );

  // Print CV
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());

  // Dynamic year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
