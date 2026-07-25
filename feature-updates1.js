/* ═══════════════════════════════════════
   FEATURE UPDATES — behavior
   Loads AFTER your main script, so it can
   safely rearrange things without editing
   your original code.
═══════════════════════════════════════ */

// ─────────────────────────────────────────
// FEATURE 1: "Your Moments" → tap-to-open Gallery folder
// ─────────────────────────────────────────
(function setupGalleryFolder() {
  const picsGrid = document.getElementById('pics-grid');
  if (!picsGrid) return;

  // Hide the old always-visible grid
  picsGrid.style.display = 'none';

  // Add the folder card right where the grid used to show
  const folderCard = document.createElement('div');
  folderCard.id = 'gallery-folder';
  folderCard.innerHTML = `
    <div class="folder-icon">✉️</div>
    <div class="folder-label">Gallery</div>
    <div class="folder-sub">tap to open your moments</div>
  `;
  picsGrid.parentNode.insertBefore(folderCard, picsGrid);

  // Build the modal that opens when the folder is tapped
  const modal = document.createElement('div');
  modal.id = 'gallery-modal';
  modal.innerHTML = `
    <div class="gallery-modal-inner">
      <button id="gallery-modal-close" aria-label="Close gallery">✕</button>
      <h3>📸 Gallery</h3>
      <div id="gallery-modal-grid" class="pics-grid"></div>
    </div>
  `;
  document.body.appendChild(modal);

  function renderGalleryModal() {
    const photos = getPhotos();
    const grid = document.getElementById('gallery-modal-grid');
    if (!photos.length) {
      grid.innerHTML = '<div class="empty-pics">🌸<br><br>No photos yet!<br>Take your first snapshot above</div>';
      return;
    }
    grid.innerHTML = photos.map((p, i) => `
      <div class="pic-item" onclick="openPreview(${i})">
        <img src="${p.img}" alt="Moment ${i+1}">
        <div class="pic-date">${new Date(p.date).toLocaleString()}</div>
        <button class="pic-delete" onclick="deletePhoto(${i}, event)">✕</button>
      </div>
    `).join('');
  }

  folderCard.addEventListener('click', () => {
    renderGalleryModal();
    modal.classList.add('show');
  });
  document.getElementById('gallery-modal-close').addEventListener('click', () => {
    modal.classList.remove('show');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // Keep the modal's grid fresh if a photo is taken while it's open
  const originalRenderPics = window.renderPics;
  window.renderPics = function () {
    originalRenderPics();
    if (modal.classList.contains('show')) renderGalleryModal();
  };
})();

// ─────────────────────────────────────────
// FEATURE 2: 3-line side nav → 2 link buttons instead of photos
// ─────────────────────────────────────────
(function setupNavLinks() {
  const sideNav = document.getElementById('side-nav');
  if (!sideNav) return;

  // Remove the old photo gallery pieces from the side nav
  const galleryDiv = document.getElementById('gallery');
  const navFooter = sideNav.querySelector('.nav-footer');
  if (galleryDiv) galleryDiv.remove();
  if (navFooter) navFooter.remove();

  // Optional: rename the panel title (edit the text below if you want a different title)
  const navTitle = sideNav.querySelector('.nav-header h2');
  if (navTitle) navTitle.textContent = 'Quick Links';

  // Add the 2 buttons
  // 👉 PASTE YOUR REAL LINKS in the href="..." parts below
  const linksWrap = document.createElement('div');
  linksWrap.className = 'nav-link-buttons';
  linksWrap.innerHTML = `
    <a href="https://lensstrokes.github.io/YummyIceCreams/" class="nav-link-btn" id="link-icecream" target="_blank" rel="noopener">🍦 Yumm Icecream</a>
    <a href="https://gardenletters.online/private?garden=6VDUNY8" class="nav-link-btn" id="link-garden" target="_blank" rel="noopener">🌷 Our Garden Letters</a>
  `;
  sideNav.appendChild(linksWrap);

  // The side nav no longer needs to render photos when opened,
  // so this replaces the original toggleNav function.
  window.toggleNav = function () {
    const nav = document.getElementById('side-nav');
    const dim = document.getElementById('overlay-dim');
    const burger = document.getElementById('hamburger');
    if (nav.classList.contains('open')) {
      closeNav();
    } else {
      nav.classList.add('open');
      dim.classList.add('show');
      burger.classList.add('open');
    }
  };
})();