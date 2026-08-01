/* ═══════════════════════════════════════
   LETTER FEATURE — behavior
   Loads AFTER your main script. Adds a
   "Open Letter" button beside your existing
   "Take a Photo" button on the home page.
═══════════════════════════════════════ */

(function setupLetterFeature() {
  const takePhotoBtn = document.querySelector('#hero a.btn-primary');
  if (!takePhotoBtn) return;

  // Wrap the existing button + a new letter button together, side by side
  const row = document.createElement('div');
  row.className = 'hero-btn-row';
  takePhotoBtn.parentNode.insertBefore(row, takePhotoBtn);
  row.appendChild(takePhotoBtn);

  const letterBtn = document.createElement('button');
  letterBtn.className = 'btn btn-letter';
  letterBtn.id = 'open-letter-btn';
  letterBtn.textContent = '💌 Open Letter';
  row.appendChild(letterBtn);

  // Build the letter modal
  const modal = document.createElement('div');
  modal.id = 'letter-modal';
  modal.innerHTML = `
    <div class="letter-paper">
      <div class="letter-heading">A little letter</div>
      <textarea id="letter-text" placeholder="Write anything you want here... 🌸"></textarea>
      <div class="letter-actions">
        <button id="letter-save">💾 Save</button>
        <button id="letter-close">✕ Close</button>
      </div>
      <div id="letter-saved-note">Saved ✨</div>
    </div>
  `;
  document.body.appendChild(modal);

  const LETTER_KEY = 'divine_letter_text';
  const textarea = document.getElementById('letter-text');
  const savedNote = document.getElementById('letter-saved-note');

  // 👉 WRITE YOUR LETTER HERE — this shows the first time the letter is opened
  const DEFAULT_LETTER_TEXT = ``;

  function loadLetter() {
    const saved = localStorage.getItem(LETTER_KEY);
    textarea.value = saved !== null ? saved : DEFAULT_LETTER_TEXT;
  }

  letterBtn.addEventListener('click', () => {
    loadLetter();
    modal.classList.add('show');
  });

  document.getElementById('letter-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });

  document.getElementById('letter-save').addEventListener('click', () => {
    try {
      localStorage.setItem(LETTER_KEY, textarea.value);
      savedNote.classList.add('show');
      setTimeout(() => savedNote.classList.remove('show'), 1800);
    } catch (e) {
      console.error('Could not save letter:', e);
    }
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
})();