/* ═══════════════════════════════════════
   EVENT: Friendship Day (July 30)
   Fully self-contained — only runs when
   loaded by event-loader.js on 07-30.

   Flow:
   1. Right after entering the site (closing
      the "Beautiful!" capture popup), shows
      a Friendship Day popup with a flower
      bouquet + a letter stuck to it.
   2. Tapping the letter asks "Can we be
      friends??" with Yes / No buttons.
      The No button dodges away every time
      it's approached or tapped.
   3. Tapping Yes reveals a photo (you add
      the image file — see instructions
      below) with a caption underneath and
      a small ✕ to close and return to the
      site normally.
═══════════════════════════════════════ */
(function () {

  // ── styles for this event only ──
  const style = document.createElement('style');
  style.textContent = `
    #friendship-overlay, #friendship-question-overlay, #friendship-photo-overlay {
      position: fixed; inset: 0; z-index: 2000;
      background: rgba(136,14,79,0.55); backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      padding: 20px; animation: fsFadeIn 0.4s ease;
    }
    @keyframes fsFadeIn { from { opacity: 0; } to { opacity: 1; } }

    .friendship-card {
      background: #fff8fa; border-radius: 28px; padding: 2rem 1.6rem 1.6rem;
      max-width: 380px; width: 100%; text-align: center;
      box-shadow: 0 20px 70px rgba(0,0,0,0.35);
      animation: fsPop 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }
    @keyframes fsPop { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    .friendship-title {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1.5rem; color: #880e4f; margin-bottom: 1.2rem;
    }

    .bouquet { position: relative; height: 180px; margin: 0 auto 1rem; width: 220px; }
    .bouquet .flower {
      position: absolute; bottom: 30px; left: 50%;
      font-size: 2.4rem; transform-origin: bottom center;
      animation: fsFlowerPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes fsFlowerPop { from { transform: translateX(-50%) scale(0); } to { transform: var(--fs-final); } }
    .bouquet-wrap { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); font-size: 3.2rem; }
    .bouquet-letter {
      position: absolute; bottom: 55px; left: 50%; transform: translateX(-50%);
      font-size: 2.1rem; cursor: pointer;
      animation: fsBounce 1.4s ease-in-out infinite;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));
    }
    @keyframes fsBounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }

    .friendship-hint { color: #c2185b; font-size: 0.85rem; opacity: 0.8; }

    .friendship-letter-card {
      position: relative; background: #fff8fa; border-radius: 24px;
      padding: 2.2rem 1.8rem; max-width: 360px; width: 100%;
      min-height: 220px; text-align: center;
      box-shadow: 0 20px 70px rgba(0,0,0,0.35);
      animation: fsPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .friendship-q-pic {
      width: 100%; max-width: 220px; border-radius: 16px;
      display: block; margin: 0 auto 1.2rem;
      box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    }
    .friendship-q {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1.4rem; color: #880e4f; margin-bottom: 2rem;
    }
    .friendship-btns { position: relative; height: 90px; }
    .friendship-btns button {
      padding: 12px 28px; border: none; border-radius: 50px;
      font-family: 'Lato', sans-serif; font-weight: 700; font-size: 0.95rem;
      cursor: pointer; letter-spacing: 0.03em;
    }
    #friend-yes {
      background: linear-gradient(135deg, #e91e8c, #ff6b9d); color: white;
      box-shadow: 0 4px 20px rgba(233,30,140,0.35);
      position: absolute; left: 20px; top: 30px;
    }
    #friend-no {
      background: #f2f2f2; color: #888;
      position: absolute; right: 20px; top: 30px;
      transition: left 0.15s ease, top 0.15s ease;
    }

    .friendship-photo-card {
      position: relative; background: #fff8fa; border-radius: 24px;
      padding: 1.6rem; max-width: 400px; width: 100%; text-align: center;
      box-shadow: 0 20px 70px rgba(0,0,0,0.35);
      animation: fsPop 0.4s cubic-bezier(0.34,1.56,0.64,1);
    }
    .friendship-photo-card img {
      width: 100%; border-radius: 16px; display: block; margin-bottom: 1rem;
    }
    .friendship-photo-caption {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: #880e4f; font-size: 1.1rem;
    }
    #friendship-photo-close {
      position: absolute; top: -14px; right: -14px;
      width: 36px; height: 36px; border-radius: 50%; border: none;
      background: white; color: #c2185b; font-size: 1.1rem; cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
    }
  `;
  document.head.appendChild(style);

  let friendshipTriggered = false;

  function triggerFriendshipEvent() {
    if (friendshipTriggered) return;
    friendshipTriggered = true;
    showFriendshipIntro();
  }

  // Fire right when the user enters the site (closes the "Beautiful!" popup after a photo)
  const originalCloseCaptureModal = window.closeCaptureModal;
  window.closeCaptureModal = function () {
    if (typeof originalCloseCaptureModal === 'function') originalCloseCaptureModal();
    triggerFriendshipEvent();
  };

  // ── Step 1: bouquet + letter popup ──
  function showFriendshipIntro() {
    const overlay = document.createElement('div');
    overlay.id = 'friendship-overlay';
    overlay.innerHTML = `
      <div class="friendship-card">
        <div class="friendship-title">🎉 Happy Friendship Day! 🎉</div>
        <div class="bouquet">
          <span class="flower" style="--fs-final: translateX(-50%) rotate(-55deg) translateY(-40px);">🌻</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(-35deg) translateY(-55px); animation-delay:0.05s">🌹</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(-15deg) translateY(-65px); animation-delay:0.1s">🪷</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(0deg) translateY(-70px); animation-delay:0.15s">🌷</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(15deg) translateY(-65px); animation-delay:0.2s">🌼</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(35deg) translateY(-55px); animation-delay:0.25s">🌹</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(55deg) translateY(-40px); animation-delay:0.3s">🌻</span>
          <span class="flower" style="--fs-final: translateX(-50%) rotate(-5deg) translateY(-30px); animation-delay:0.35s">🪷</span>
          <div class="bouquet-wrap">💐</div>
          <div class="bouquet-letter" id="bouquet-letter">✉️</div>
        </div>
        <div class="friendship-hint">tap the letter 💌</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('bouquet-letter').addEventListener('click', () => {
      overlay.remove();
      openFriendshipLetter();
    });
  }

  // ── Step 2: "Can we be friends??" with a dodging No button ──
  function openFriendshipLetter() {
    const modal = document.createElement('div');
    modal.id = 'friendship-question-overlay';
    modal.innerHTML = `
      <div class="friendship-letter-card">
        <img class="friendship-q-pic" src="events/friendship-photo1.jpg" alt="">
        <div class="friendship-q">U said I am stranger to U Huhh 😟🥺Can we be friends from today ?? 🌸</div>
        <div class="friendship-btns">
          <button id="friend-yes">Yes 🥰</button>
          <button id="friend-no">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const noBtn = document.getElementById('friend-no');
    const zone = modal.querySelector('.friendship-btns');

    function dodge() {
      const zoneRect = zone.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      const maxX = Math.max(10, zoneRect.width - btnRect.width - 10);
      const maxY = Math.max(10, zoneRect.height - btnRect.height - 10);
      noBtn.style.left = Math.random() * maxX + 'px';
      noBtn.style.top = Math.random() * maxY + 'px';
      noBtn.style.right = 'auto';
    }
    noBtn.addEventListener('mouseenter', dodge);
    noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); }, { passive: false });
    noBtn.addEventListener('click', (e) => { e.preventDefault(); dodge(); });

    document.getElementById('friend-yes').addEventListener('click', () => {
      modal.remove();
      showFriendshipPhoto();
    });
  }

  // ── Step 3: photo reveal ──
  function showFriendshipPhoto() {
    const overlay = document.createElement('div');
    overlay.id = 'friendship-photo-overlay';
    overlay.innerHTML = `
      <div class="friendship-photo-card">
        <button id="friendship-photo-close">✕</button>
        <img src="events/friendship-photo2.jpg" alt="Friends">
        <div class="friendship-photo-caption">Yeeee I am no more Stranger now 🥹,But Only friends nothing else🫰🫵🙂</div>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('friendship-photo-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }
})();
