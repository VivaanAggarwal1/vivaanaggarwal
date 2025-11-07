document.addEventListener('DOMContentLoaded', () => {
  const checkBtn = document.getElementById('check');
  const resetBtn = document.getElementById('reset');
  const input = document.getElementById('answer');
  const result = document.getElementById('result');
  const clueTitle = document.getElementById('clue-title');
  const clueText = document.getElementById('clue-text');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  // simple clue list — edit/add more clues here
  const clues = [
    { q: 'I have a ring but no finger, I connect people but can’t speak. What am I?', a: ['phone','telephone','mobile'] },
    { q: 'I follow you everywhere but never touch your feet; I show your face without being deceit. What am I?', a: ['mirror'] },
    { q: 'Final: Combine the first letters of the answers to form a 3-letter word. What is it?', a: [] } // final accepts code built at runtime
  ];

  let idx = 0;
  function loadClue(i){
    clueTitle.textContent = `Clue #${i+1}`;
    clueText.textContent = clues[i].q;
    input.value = '';
    result.textContent = '';
    input.focus();
  }

  loadClue(idx);

  checkBtn.addEventListener('click', () => {
    const answer = input.value.trim().toLowerCase();
    if (!answer) {
      result.textContent = 'Type an answer before submitting.';
      return;
    }

    // special handling for the final clue: compute code from previous answers
    if (idx === clues.length - 1) {
      // build code from first letters of storedAnswers
      const code = (window._crypticStored || []).map(s => s[0] || '').join('').toLowerCase();
      if (answer === code) {
        result.style.color = '#7dffb1';
        result.textContent = '🎉 Correct — you completed the Cryptic Hunt!';
      } else {
        result.style.color = '#ff8a8a';
        result.textContent = 'Incorrect final code. Check earlier answers.';
      }
      return;
    }

    const possible = clues[idx].a;
    if (possible.includes(answer)) {
      // store answer for final code
      window._crypticStored = window._crypticStored || [];
      window._crypticStored[idx] = answer;
      result.style.color = '#7dffb1';
      result.textContent = '✅ Correct! Loading next clue...';
      setTimeout(() => {
        idx++;
        if (idx < clues.length) loadClue(idx);
      }, 700);
    } else {
      result.style.color = '#ff8a8a';
      result.textContent = '❌ Wrong answer. Try again.';
    }
  });

  resetBtn.addEventListener('click', () => {
    idx = 0;
    window._crypticStored = [];
    loadClue(idx);
    result.style.color = '';
    result.textContent = '';
  });

  // allow Enter key to submit
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkBtn.click();
  });
});
