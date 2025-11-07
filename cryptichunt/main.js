// main.js — robust logic (Enter or click). Place in same folder.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('answerForm');
  const input = document.getElementById('answer');
  const feedback = document.getElementById('feedback');

  // accepted normalized answers (lower-case)
  const accepted = new Set(['vnvy0ufy']);

  const norm = s => (s || '').toLowerCase().trim();

  function showWrong(){
    feedback.className = 'feedback wrong';
    feedback.textContent = 'Wrong';
  }

  function showCorrect(){
    feedback.className = 'feedback correct';
    feedback.textContent = 'Correct!';
    setTimeout(() => {
      if (!feedback.querySelector('.plus')) {
        const span = document.createElement('span');
        span.className = 'plus';
        span.textContent = '+1';
        feedback.appendChild(span);
      }
    }, 260);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = norm(input.value);
    if (!val) { showWrong(); input.focus(); return; }
    if (accepted.has(val)) { showCorrect(); input.blur(); }
    else { showWrong(); input.focus(); }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  input.focus();

  // diagnostic flag — check in Console: document.documentElement.getAttribute('data-cryptic-active')
  document.documentElement.setAttribute('data-cryptic-active', 'crypt-final');
});
