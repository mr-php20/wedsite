/* =========================================
   ARIVALAN & AKSHAYA — WEDDING INVITATION
   Main JavaScript
   ========================================= */

(function () {
  'use strict';

  /* ---------- COUNTDOWN TIMER ---------- */
  // Wedding date: 29 May 2026, 9:00 AM IST (UTC+5:30)
  const WEDDING_DATE = new Date('2026-05-29T09:00:00+05:30');

  const $days    = document.getElementById('cdDays');
  const $hours   = document.getElementById('cdHours');
  const $minutes = document.getElementById('cdMinutes');
  const $seconds = document.getElementById('cdSeconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function updateCountdown() {
    const now  = new Date();
    let diff = WEDDING_DATE - now;

    if (diff <= 0) {
      $days.textContent    = '00';
      $hours.textContent   = '00';
      $minutes.textContent = '00';
      $seconds.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= d * 1000 * 60 * 60 * 24;
    const h = Math.floor(diff / (1000 * 60 * 60));
    diff -= h * 1000 * 60 * 60;
    const m = Math.floor(diff / (1000 * 60));
    diff -= m * 1000 * 60;
    const s = Math.floor(diff / 1000);

    $days.textContent    = pad(d);
    $hours.textContent   = pad(h);
    $minutes.textContent = pad(m);
    $seconds.textContent = pad(s);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- SCROLL ANIMATIONS (Intersection Observer) ---------- */
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- BACKGROUND AUDIO PLAYER ---------- */
  const audioToggle = document.getElementById('audioToggle');
  const bgMusic     = document.getElementById('bgMusic');
  let isPlaying = false;

  audioToggle.addEventListener('click', function () {
    if (!bgMusic.src && !bgMusic.querySelector('source[src]')) {
      // No audio file provided yet — skip silently
      return;
    }

    if (isPlaying) {
      bgMusic.pause();
      audioToggle.classList.remove('playing');
      isPlaying = false;
    } else {
      bgMusic.play().then(function () {
        audioToggle.classList.add('playing');
        isPlaying = true;
      }).catch(function () {
        // Browser may block autoplay — ignore
      });
    }
  });

})();
