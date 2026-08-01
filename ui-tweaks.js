/* ═══════════════════════════════════════
   UI TWEAKS — behavior
   Reveals the 3-line menu only once the
   home page is shown (after the splash
   camera is dismissed).

   Load this AFTER your main script.
═══════════════════════════════════════ */
(function () {
  const originalDismissSplash = window.dismissSplash;
  window.dismissSplash = function (capturedPhoto) {
    if (typeof originalDismissSplash === 'function') originalDismissSplash(capturedPhoto);
    const hamburger = document.getElementById('hamburger');
    if (hamburger) hamburger.classList.add('home-visible');
  };
})();
