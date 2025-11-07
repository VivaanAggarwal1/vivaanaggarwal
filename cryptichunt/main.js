// main.js — minimal, robust logic (Enter and Button). Put in same folder.
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('answerForm');
  const input = document.getElementById('answer');
  const feedback = document.getElementById('feedback');

  // Accepted answers (normalized lower-case)
  const accepted = new Set([
    'vnvy0ufy'   // primary expected answer
    // add variants if you want (e.g., 'vnvy0ufy.')
  ]);

  const normalize = s => (s || '').toLowerCase().trim();

  function showWrong() {
    feedback.className = 'feedback wrong';
    feedback.textContent = 'Wrong';
  }

  function showCorrect() {
    feedback.className = 'feedback correct';
    feedback.textContent = 'Correct!';
    // append +1 badge after brief delay to allow 'Correct!' to appear first
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
    const val = normalize(input.value);
    if (!val) {
      showWrong();
      input.focus();
      return;
    }
    if (accepted.has(val)) {
      showCorrect();
      input.blur(); // optional: remove focus
    } else {
      showWrong();
      input.focus();
    }
  });

  // ensure Enter works even if form isn't used directly (redundant but safe)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  });

  // autofocus for fast typing
  input.focus();

  // diagnostic attribute — confirms JS ran (use devtools console to check)
  document.documentElement.setAttribute('data-cryptic-active', '1');
});
