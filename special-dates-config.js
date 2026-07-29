/* ═══════════════════════════════════════
   SPECIAL DATES CONFIG
   This is the ONLY file you touch to add
   a new special day. One line per event.

   Format 'MM-DD'        → repeats every year (birthdays, anniversaries)
   Format 'YYYY-MM-DD'   → fires only once, that exact date

   "file" = path to that event's own separate file
═══════════════════════════════════════ */
const SPECIAL_EVENTS = [
    { date: '07-30', file: 'events/event-friendshipday2.js' },
  

  // 👉 add more like this, one line each:
  // { date: '12-25', file: 'events/event-christmas.js' },
  // { date: '2027-02-14', file: 'events/event-valentine.js' },
];