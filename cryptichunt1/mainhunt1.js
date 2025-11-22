
// Smooth + robust JS for cryptic hunt page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('answerForm');
  const input = document.getElementById('answer');
  const feedback = document.getElementById('feedback');
  const accepted = new Set(['mars']); // accepted answers

  const normalize = str => (str || '').toLowerCase().trim();

  function showWrong() {
    feedback.className = 'feedback wrong';
    feedback.textContent = 'Wrong';
  }

  function showCorrect() {
    feedback.className = 'feedback correct';
    feedback.textContent = 'Correct!';
    setTimeout(() => {
      if (!feedback.querySelector('.plus')) {
        const plus = document.createElement('span');
        plus.className = 'plus';
        plus.textContent = '+1';
        feedback.appendChild(plus);
      }
    }, 200);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = normalize(input.value);
    if (!val) { showWrong(); return; }
    if (accepted.has(val)) { showCorrect(); input.blur(); }
    else { showWrong(); input.focus(); }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  document.documentElement.setAttribute('data-cryptic-active', 'crypt-hunt');
});

