/* =============================================
   ARIVALAN & AKSHAYA — WEDDING INVITATION JS
   ============================================= */

(function () {
  'use strict';

  /* ---------- LOADING SCREEN ---------- */
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loadingScreen.classList.add('hidden');
      }, 2200);
    });
  }

  /* ---------- COUNTDOWN TIMER ---------- */
  const weddingDate = new Date('2026-05-29T09:00:00+05:30').getTime();

  const daysEl   = document.getElementById('cdDays');
  const hoursEl  = document.getElementById('cdHours');
  const minsEl   = document.getElementById('cdMinutes');
  const secsEl   = document.getElementById('cdSeconds');

  function updateCountdown() {
    const now  = Date.now();
    const diff = weddingDate - now;

    if (diff <= 0) {
      if (daysEl)  daysEl.textContent  = '0';
      if (hoursEl) hoursEl.textContent = '0';
      if (minsEl)  minsEl.textContent  = '0';
      if (secsEl)  secsEl.textContent  = '0';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl)  daysEl.textContent  = d;
    if (hoursEl) hoursEl.textContent = h;
    if (minsEl)  minsEl.textContent  = m;
    if (secsEl)  secsEl.textContent  = s;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- SCROLL ANIMATIONS ---------- */
  var animateEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animateEls.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    animateEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animateEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- AUDIO TOGGLE ---------- */
  var audioToggle = document.getElementById('audioToggle');
  var bgMusic     = document.getElementById('bgMusic');

  if (audioToggle && bgMusic) {
    audioToggle.addEventListener('click', function () {
      if (bgMusic.paused) {
        bgMusic.play().then(function () {
          audioToggle.classList.add('playing');
        }).catch(function () {
          // Autoplay blocked
        });
      } else {
        bgMusic.pause();
        audioToggle.classList.remove('playing');
      }
    });
  }

  /* ---------- SHARE BUTTON ---------- */
  var shareBtn = document.getElementById('shareBtn');

  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var shareData = {
        title: 'Arivalan & Akshaya Wedding',
        text: 'You are cordially invited to the wedding of Arivalan & Akshaya on 29th May 2026.',
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {
          // Share cancelled or failed silently
        });
      } else {
        // Fallback: copy link to clipboard
        navigator.clipboard.writeText(window.location.href).then(function () {
          var original = shareBtn.innerHTML;
          shareBtn.innerHTML = '<span>Link Copied!</span>';
          setTimeout(function () {
            shareBtn.innerHTML = original;
          }, 2000);
        }).catch(function () {
          // Clipboard write failed silently
        });
      }
    });
  }

})();
