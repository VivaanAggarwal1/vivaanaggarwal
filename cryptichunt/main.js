// Minimal submit-only interface
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('answer');
  const btn = document.getElementById('submit');
  const feedback = document.getElementById('feedback');

  // Set your correct answer here (case-insensitive)
  // Change this to whatever you want the real solution to be.
  const correctAnswer = 'vnvy0ufy';

  // helper to normalize strings for comparison
  const normalize = s => (s || '').trim().toLowerCase();

  // on submit
  btn.addEventListener('click', () => {
    const val = normalize(input.value);
    if (!val) {
      feedback.className = 'feedback wrong';
      feedback.textContent = 'Wrong';
      return;
    }

    if (val === normalize(correctAnswer)) {
      feedback.className = 'feedback correct';
      feedback.textContent = 'Correct!';

      // show +1 after tiny delay
      setTimeout(() => {
        // append +1 badge
        const badge = document.createElement('span');
        badge.className = 'plus-badge';
        badge.textContent = '+1';
        // remove any existing badge first
        const existing = feedback.querySelector('.plus-badge');
        if (existing) existing.remove();
        feedback.appendChild(badge);
      }, 260);

      // optionally disable input so user can't resubmit (comment out if not desired)
      // input.disabled = true; btn.disabled = true;
    } else {
      feedback.className = 'feedback wrong';
      feedback.textContent = 'Wrong';
    }
  });

  // allow Enter to submit
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });

  // focus the input on load
  input.focus();
});
