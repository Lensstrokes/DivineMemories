/* ═══════════════════════════════════════
   storage-fix-v2.js
   Use this INSTEAD of storage-fix.js
   (remove that script tag if you added it).

   Fixes 2 things:
   1. Storage-full crash when saving photos
      (auto-drops oldest photos to make room).
   2. Crash from renderGallery() trying to
      update the old #gallery element, which
      feature-updates1.js removes when it adds
      the 2 link buttons. Now it just skips
      that step safely if the element is gone.
═══════════════════════════════════════ */

function renderGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return; // side-nav gallery was replaced by the 2 link buttons — nothing to render
  const photos = getPhotos();
  if (photos.length === 0) {
    gallery.innerHTML = '<div class="empty-gallery">🌸<br>No photos yet.<br>Tap the shutter to take your first one!</div>';
    return;
  }
  gallery.innerHTML = photos.map((p, i) => `
    <div class="thumb" onclick="openPreview(${i})">
      <img src="${p.img}" alt="Photo">
      <div class="pic-date">${new Date(p.date).toLocaleDateString('en-IN', {month:'short', day:'numeric'})}</div>
      <button class="del" onclick="deletePhoto(${i}, event)">✕</button>
    </div>
  `).join('');
}

function savePhoto(dataUrl) {
  let photos = getPhotos();
  photos.unshift({ img: dataUrl, date: new Date().toISOString() });

  let saved = false;
  while (!saved) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
      saved = true;
    } catch (e) {
      if (photos.length > 1) {
        photos.pop(); // drop oldest photo, try again
      } else {
        console.error('storage-fix: could not save photo, even alone. Storage may be blocked.', e);
        saved = true;
      }
    }
  }

  renderGallery();
  renderPics();
}