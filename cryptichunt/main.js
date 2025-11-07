// main.js — minimal, robust submit handling for cryptic level
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('answer-form');
  const input = document.getElementById('answer');
  const feedback = document.getElementById('feedback');

  // Primary accepted answer(s) — lowercase normalized.
  // Change/add entries to accept more variants.
  const accepted = new Set([
    'vnvy0ufy', // primary expected answer
    // add other normalized alternatives if desired:
    // 'vnvyof y', 'vnvy0uffy', etc (normalized w/o spaces)
  ]);

  const normalize = s => (s || '').toLowerCase().trim();

  // helper: show wrong
  const showWrong = () => {
    feedback.className = 'feedback wrong';
    feedback.textContent = 'Wrong';
  };

  // helper: show correct + +1
  const showCorrect = () => {
    feedback.className = 'feedback correct';
    feedback.textContent = 'Correct!';

    // append +1 badge shortly after
    setTimeout(() => {
      // make sure we don't append duplicate badges
      const existing = feedback.querySelector('.plus');
      if (existing) return;
      const span = document.createElement('span');
      span.className = 'plus';
      span.textContent = '+1';
      feedback.appendChild(span);
    }, 260);
  };

  // handle submit from form (also works for Enter key)
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const val = normalize(input.value);

    if (!val) {
      showWrong();
      input.focus();
      return;
    }

    if (accepted.has(val)) {
      showCorrect();
      input.blur();
      // optionally disable to prevent repeat submissions
      // input.disabled = true;
      // form.querySelector('button[type="submit"]').disabled = true;
    } else {
      showWrong();
      input.focus();
    }
  });

  // ensure accessible initial focus
  input.focus();
});
