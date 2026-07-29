/* ═══════════════════════════════════════
   EVENT LOADER
   Checks today's date against
   special-dates-config.js and loads ONLY
   the matching event file(s) — nothing
   else runs on a normal day.

   Load this AFTER special-dates-config.js.
═══════════════════════════════════════ */
(function checkSpecialDates() {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const yyyy = today.getFullYear();

  const todayMD = `${mm}-${dd}`;
  const todayFull = `${yyyy}-${mm}-${dd}`;

  SPECIAL_EVENTS.forEach((event) => {
    if (event.date === todayMD || event.date === todayFull) {
      const script = document.createElement('script');
      script.src = event.file;
      document.body.appendChild(script);
      console.log('🎉 Special event loaded for today:', event.file);
    }
  });
})();