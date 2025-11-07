document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('answer');
  const submit = document.getElementById('submit');
  const feedback = document.getElementById('feedback');

  // ✅ Correct answer(s) here (case-insensitive)
  const correctAnswers = ['vnvy0ufy'];

  const normalize = s => (s || '').trim().toLowerCase();

  function showFeedback(type, text) {
    feedback.className = type;
    feedback.textContent = text;
  }

  function addPlusOne() {
    const badge = document.createElement('span');
    badge.textContent = '+1';
    badge.className = 'plus';
    feedback.appendChild(badge);
  }

  function checkAnswer() {
    const answer = normalize(input.value);
    if (!answer) {
      showFeedback('wrong', 'Wrong');
      return;
    }

    if (correctAnswers.includes(answer)) {
      showFeedback('correct', 'Correct!');
      setTimeout(addPlusOne, 300);
    } else {
      showFeedback('wrong', 'Wrong');
    }
  }

  submit.addEventListener('click', checkAnswer);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });
});
