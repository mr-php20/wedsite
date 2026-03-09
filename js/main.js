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
      }, 1200);
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

  /* ---------- GLOBAL LANGUAGE TOGGLE ---------- */
  var langToggle = document.getElementById('langToggle');
  var langToggleLabel = document.getElementById('langToggleLabel');
  var currentLang = 'en';

  var translations = [
    // Hero
    { sel: '.hero-subtitle', en: 'Wedding Invitation', ta: '\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0ba3 \u0b85\u0bb4\u0bc8\u0baa\u0bcd\u0baa\u0bbf\u0ba4\u0bb4\u0bcd' },
    { sel: '.hero-groom', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.weds-text', en: 'Weds', ta: 'உடன்' },
    { sel: '.hero-bride', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Invocation
    { sel: '.blessing-text', en: 'With the heavenly blessings of the Almighty', ta: '\u0b87\u0bb1\u0bc8\u0bb5\u0ba9\u0bbf\u0ba9\u0bcd \u0ba4\u0bbf\u0bb0\u0bc1\u0bb5\u0bb0\u0bc1\u0bb3\u0bbe\u0bb2\u0bcd' },
    { sel: '.parent-group:first-child .parent-label', en: 'Parents of the Groom', ta: '\u0bae\u0ba3\u0bae\u0b95\u0ba9\u0bbf\u0ba9\u0bcd \u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd' },
    { sel: '.parent-group:last-child .parent-label', en: 'Parents of the Bride', ta: '\u0bae\u0ba3\u0bae\u0b95\u0bb3\u0bbf\u0ba9\u0bcd \u0baa\u0bc6\u0bb1\u0bcd\u0bb1\u0bcb\u0bb0\u0bcd' },
    { sel: '.invite-label', en: 'Cordially invite you', ta: 'திருமண விழாவிற்கு' },
    { sel: '.invite-sub', en: 'to join in the wedding celebrations of', ta: 'அன்புடன் அழைக்கின்றனர்' },
    { sel: '.couple-name.groom-name', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.couple-amp', en: '&', ta: '&' },
    { sel: '.couple-name.bride-name', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Events
    { sel: '#events .section-label', en: 'Save the Date', ta: 'நாள்' },
    { sel: '#events .section-title', en: 'Muhurtham', ta: '\u0bae\u0bc1\u0b95\u0bc2\u0bb0\u0bcd\u0ba4\u0bcd\u0ba4\u0bae\u0bcd' },
    { sel: '.event-name', en: 'Muhurtham', ta: '\u0bae\u0bc1\u0b95\u0bc2\u0bb0\u0bcd\u0ba4\u0bcd\u0ba4\u0bae\u0bcd' },
    { sel: '.event-date', en: 'Friday, May 29th, 2026', ta: '\u0bb5\u0bc6\u0bb3\u0bcd\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb4\u0bae\u0bc8, \u0bae\u0bc7 29, 2026' },
    { sel: '.event-venue', en: 'Maharaasi Mahal, Tirunelveli', ta: '\u0bae\u0b95\u0bbe\u0bb0\u0bbe\u0b9a\u0bbf \u0bae\u0bb9\u0bbe\u0bb2\u0bcd, \u0ba4\u0bbf\u0bb0\u0bc1\u0ba8\u0bc6\u0bb2\u0bcd\u0bb5\u0bc7\u0bb2\u0bbf' },
    { sel: '.event-time', en: '9:00 AM \u2013 10:30 AM', ta: '\u0b95\u0bbe\u0bb2\u0bc8 9:00 \u2013 10:30' },
    { sel: '.event-map-btn .btn-text', en: 'See the route', ta: '\u0bb5\u0bb4\u0bbf\u0baf\u0bc8\u0b95\u0bcd \u0b95\u0bbe\u0ba3' },
    // Kural
    { sel: '.kural-meaning', en: '\u201cThe loveless possess everything for themselves;<br>the loving give even their bones for others.\u201d', ta: '\u201c\u0b85\u0ba9\u0bcd\u0baa\u0bc1 \u0b87\u0bb2\u0bcd\u0bb2\u0bbe\u0ba4\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd \u0b8e\u0bb2\u0bcd\u0bb2\u0bbe\u0bae\u0bcd \u0ba4\u0bae\u0b95\u0bcd\u0b95\u0bc7 \u0b89\u0bb0\u0bbf\u0baf\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd;<br>\u0b85\u0ba9\u0bcd\u0baa\u0bc1 \u0b89\u0b9f\u0bc8\u0baf\u0bb5\u0bb0\u0bcd\u0b95\u0bb3\u0bcd \u0ba4\u0bae\u0bcd \u0b8e\u0bb2\u0bc1\u0bae\u0bcd\u0baa\u0bc8\u0baf\u0bc1\u0bae\u0bcd \u0baa\u0bbf\u0bb1\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0b89\u0bb0\u0bbf\u0baf\u0ba4\u0bbe\u0b95\u0bcd\u0b95\u0bc1\u0bb5\u0bb0\u0bcd.\u201d' },
    { sel: '.kural-source', en: '\u2014 Thirukkural, Kural 72', ta: '\u2014 \u0ba4\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bb1\u0bb3\u0bcd, \u0b95\u0bc1\u0bb1\u0bb3\u0bcd 72' },
    // Couple
    { sel: '#couple .section-label', en: 'meet the', ta: '\u0b9a\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '#couple .section-title', en: 'Bride &amp; Groom', ta: '\u0bae\u0ba3\u0bae\u0b95\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.groom-photo .photo-name', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.bride-photo .photo-name', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    { sel: '.groom-photo .photo-placeholder span', en: 'A', ta: '\u0b85' },
    { sel: '.bride-photo .photo-placeholder span', en: 'A', ta: '\u0b85' },
    { sel: '.couple-message p:first-child', en: 'We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people has been incredibly moving, and has touched us both deeply.', ta: '\u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bbe\u0bb4\u0bcd\u0bb5\u0bbf\u0ba9\u0bcd \u0bae\u0bbf\u0b95 \u0bae\u0b95\u0bbf\u0bb4\u0bcd\u0b9a\u0bcd\u0b9a\u0bbf\u0baf\u0bbe\u0ba9 \u0ba8\u0bbe\u0bb3\u0bbf\u0bb2\u0bcd \u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bb2\u0ba8\u0bcd\u0ba4\u0bc1\u0b95\u0bca\u0bb3\u0bcd\u0bb5\u0ba4\u0bc1 \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1 \u0bae\u0bbf\u0b95\u0bb5\u0bc1\u0bae\u0bcd \u0bae\u0b95\u0bbf\u0bb4\u0bcd\u0b9a\u0bcd\u0b9a\u0bbf \u0b85\u0bb3\u0bbf\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0ba4\u0bc1. \u0baa\u0bb2\u0bb0\u0bbf\u0ba9\u0bcd \u0b85\u0ba9\u0bcd\u0baa\u0bc1\u0bae\u0bcd \u0b86\u0b9a\u0bbf\u0b95\u0bb3\u0bc1\u0bae\u0bcd \u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0b86\u0bb4\u0bae\u0bbe\u0b95 \u0ba4\u0bca\u0b9f\u0bcd\u0b9f\u0bc1\u0bb3\u0bcd\u0bb3\u0ba9.' },
    { sel: '.couple-message p:last-child', en: 'We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to seeing you at the wedding.', ta: '\u0b85\u0ba9\u0bc8\u0bb5\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0bae\u0ba9\u0bae\u0bbe\u0bb0\u0bcd\u0ba8\u0bcd\u0ba4 \u0ba8\u0ba9\u0bcd\u0bb1\u0bbf\u0baf\u0bc8\u0ba4\u0bcd \u0ba4\u0bc6\u0bb0\u0bbf\u0bb5\u0bbf\u0ba4\u0bcd\u0ba4\u0bc1\u0b95\u0bcd\u0b95\u0bca\u0bb3\u0bcd\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd. \u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0ba3\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc8\u0b9a\u0bcd \u0b9a\u0ba8\u0bcd\u0ba4\u0bbf\u0b95\u0bcd\u0b95 \u0b86\u0bb5\u0bb2\u0bc1\u0b9f\u0ba9\u0bcd \u0b95\u0bbe\u0ba4\u0bcd\u0ba4\u0bbf\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd.' },
    // Gallery
    { sel: '#gallery .section-label', en: 'our', ta: '\u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '#gallery .section-title', en: 'Gallery', ta: '\u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0ba4\u0bcd \u0ba4\u0bca\u0b95\u0bc1\u0baa\u0bcd\u0baa\u0bc1' },
    { sel: '.gallery-hint', en: '\u2190 Swipe to see more \u2192', ta: '\u2190 \u0bae\u0bc7\u0bb2\u0bc1\u0bae\u0bcd \u0b95\u0bbe\u0ba3 \u2192' },
    // RSVP
    { sel: '#rsvp .section-label', en: 'Please', ta: '\u0ba4\u0baf\u0bb5\u0bc1\u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bc1' },
    { sel: '#rsvp .section-title', en: 'RSVP', ta: '\u0baa\u0ba4\u0bbf\u0bb2\u0bcd \u0b85\u0bb3\u0bbf\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.rsvp-text', en: 'Click to message on WhatsApp', ta: 'WhatsApp-\u0bb2\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0ba4\u0bbf \u0b85\u0ba9\u0bc1\u0baa\u0bcd\u0baa \u0b95\u0bbf\u0bb3\u0bbf\u0b95\u0bcd \u0b9a\u0bc6\u0baf\u0bcd\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.whatsapp-btn .btn-text', en: 'RSVP on WhatsApp', ta: 'WhatsApp-\u0bb2\u0bcd \u0baa\u0ba4\u0bbf\u0bb2\u0bb3\u0bbf\u0baf\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    // Info
    { sel: '#info .section-label', en: 'A few', ta: '\u0b9a\u0bbf\u0bb2' },
    { sel: '#info .section-title', en: 'Things to Know', ta: '\u0ba4\u0bc6\u0bb0\u0bbf\u0ba8\u0bcd\u0ba4\u0bc1\u0b95\u0bca\u0bb3\u0bcd\u0bb3 \u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bbf\u0baf\u0bb5\u0bc8' },
    { sel: '.info-intro', en: 'To help you feel at ease and enjoy every moment of the celebrations, we\u2019ve gathered a few thoughtful details we\u2019d love for you to know before the big day.', ta: '\u0bb5\u0bbf\u0bb4\u0bbe\u0bb5\u0bbf\u0ba9\u0bcd \u0b92\u0bb5\u0bcd\u0bb5\u0bca\u0bb0\u0bc1 \u0ba4\u0bb0\u0bc1\u0ba3\u0ba4\u0bcd\u0ba4\u0bc8\u0baf\u0bc1\u0bae\u0bcd \u0ba8\u0bc0\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bae\u0b95\u0bbf\u0bb4\u0bcd\u0b9a\u0bcd\u0b9a\u0bbf\u0baf\u0bbe\u0b95 \u0b85\u0ba9\u0bc1\u0baa\u0bb5\u0bbf\u0b95\u0bcd\u0b95, \u0b9a\u0bbf\u0bb2 \u0bae\u0bc1\u0b95\u0bcd\u0b95\u0bbf\u0baf\u0bae\u0bbe\u0ba9 \u0ba4\u0b95\u0bb5\u0bb2\u0bcd\u0b95\u0bb3\u0bc8 \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0ba4\u0bcd \u0ba4\u0bc6\u0bb0\u0bbf\u0bb5\u0bbf\u0b95\u0bcd\u0b95 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0bc1\u0b95\u0bbf\u0bb1\u0bcb\u0bae\u0bcd.' },
    { sel: '.info-grid .info-card:nth-child(1) .info-title', en: 'Hashtag', ta: '\u0bb9\u0bc7\u0bb7\u0bcd\u0b9f\u0bc7\u0b95\u0bcd' },
    { sel: '.info-grid .info-card:nth-child(1) .info-desc', en: 'While posting photos on social media please use the hashtag \u2014 <strong>#ArivalanWedsAkshaya</strong>', ta: '\u0b9a\u0bae\u0bc2\u0b95 \u0b8a\u0b9f\u0b95\u0b99\u0bcd\u0b95\u0bb3\u0bbf\u0bb2\u0bcd \u0baa\u0bc1\u0b95\u0bc8\u0baa\u0bcd\u0baa\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bc8 \u0baa\u0ba4\u0bbf\u0bb5\u0bbf\u0b9f\u0bc1\u0bae\u0bcd\u0baa\u0bcb\u0ba4\u0bc1 \u2014 <strong>#ArivalanWedsAkshaya</strong> \u0bb9\u0bc7\u0bb7\u0bcd\u0b9f\u0bc7\u0b95\u0bcd\u0b95\u0bc8\u0baa\u0bcd \u0baa\u0baf\u0ba9\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0bb5\u0bc1\u0bae\u0bcd' },
    { sel: '.info-grid .info-card:nth-child(2) .info-title', en: 'Weather', ta: '\u0bb5\u0bbe\u0ba9\u0bbf\u0bb2\u0bc8' },
    { sel: '.info-grid .info-card:nth-child(2) .info-desc', en: 'It will be warm and sunny with temperatures reaching up to 38\u00b0C at the venue. Light, breathable attire is recommended.', ta: '\u0ba4\u0bbf\u0bb0\u0bc1\u0bae\u0ba3 \u0bae\u0ba3\u0bcd\u0b9f\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0bb2\u0bcd \u0bb5\u0bc6\u0baa\u0bcd\u0baa\u0ba8\u0bbf\u0bb2\u0bc8 38\u00b0C \u0bb5\u0bb0\u0bc8 \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd. \u0b87\u0bb2\u0b95\u0bc1\u0bb5\u0bbe\u0ba9 \u0b86\u0b9f\u0bc8\u0b95\u0bb3\u0bc8 \u0b85\u0ba3\u0bbf\u0baf\u0bb5\u0bc1\u0bae\u0bcd.' },
    { sel: '.info-grid .info-card:nth-child(3) .info-title', en: 'Dresscode', ta: '\u0b86\u0b9f\u0bc8' },
    { sel: '.info-grid .info-card:nth-child(3) .info-desc', en: 'Traditional attire is preferred. Ladies in sarees and gentlemen in veshti or formal wear would be wonderful.', ta: '\u0baa\u0bbe\u0bb0\u0bae\u0bcd\u0baa\u0bb0\u0bbf\u0baf \u0b89\u0b9f\u0bc8 \u0bb5\u0bbf\u0bb0\u0bc1\u0bae\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0b95\u0bcd\u0b95\u0ba4\u0bc1. \u0baa\u0bc6\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0baa\u0bc1\u0b9f\u0bb5\u0bc8\u0baf\u0bbf\u0bb2\u0bc1\u0bae\u0bcd, \u0b86\u0ba3\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bc7\u0bb7\u0bcd\u0b9f\u0bbf \u0b85\u0bb2\u0bcd\u0bb2\u0ba4\u0bc1 \u0bae\u0bc1\u0bb1\u0bc8\u0baf\u0bbe\u0ba9 \u0b89\u0b9f\u0bc8\u0baf\u0bbf\u0bb2\u0bc1\u0bae\u0bcd \u0bb5\u0bb0\u0bc1\u0bb5\u0ba4\u0bc1 \u0b85\u0bb4\u0b95\u0bbe\u0b95 \u0b87\u0bb0\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd.' },
    { sel: '.info-grid .info-card:nth-child(4) .info-title', en: 'Parking', ta: '\u0bb5\u0bbe\u0b95\u0ba9 \u0ba8\u0bbf\u0bb1\u0bc1\u0ba4\u0bcd\u0ba4\u0bae\u0bcd' },
    { sel: '.info-grid .info-card:nth-child(4) .info-desc', en: 'Ample parking space is available at the venue for all our guests.', ta: '\u0b85\u0ba9\u0bc8\u0ba4\u0bcd\u0ba4\u0bc1 \u0bb5\u0bbf\u0bb0\u0bc1\u0ba8\u0bcd\u0ba4\u0bbf\u0ba9\u0bb0\u0bcd\u0b95\u0bb3\u0bc1\u0b95\u0bcd\u0b95\u0bc1\u0bae\u0bcd \u0baa\u0bcb\u0ba4\u0bc1\u0bae\u0bbe\u0ba9 \u0bb5\u0bbe\u0b95\u0ba9 \u0ba8\u0bbf\u0bb1\u0bc1\u0ba4\u0bcd\u0ba4 \u0bb5\u0b9a\u0ba4\u0bbf \u0b89\u0bb3\u0bcd\u0bb3\u0ba4\u0bc1.' },
    // Social
    { sel: '.follow-text-1', en: 'Follow', ta: '\u0ba4\u0bca\u0b9f\u0bb0\u0bc1\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.follow-text-2', en: 'the', ta: '' },
    { sel: '.follow-text-3', en: 'action', ta: '\u0ba8\u0bbf\u0b95\u0bb4\u0bcd\u0bb5\u0bc1\u0b95\u0bb3\u0bc8' },
    { sel: '.instagram-btns .instagram-btn:first-child .btn-text', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.instagram-btns .instagram-btn:last-child .btn-text', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Countdown
    { sel: '#countdown .section-label', en: 'The', ta: '' },
    { sel: '#countdown .section-title', en: 'Countdown Begins', ta: '\u0ba8\u0bbe\u0bb3\u0bcd \u0b8e\u0ba3\u0bcd\u0ba3\u0bbf\u0b95\u0bcd\u0b95\u0bc8' },
    { sel: '.countdown-item:nth-child(1) .countdown-label', en: 'Days', ta: '\u0ba8\u0bbe\u0b9f\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.countdown-item:nth-child(2) .countdown-label', en: 'Hours', ta: '\u0bae\u0ba3\u0bbf' },
    { sel: '.countdown-item:nth-child(3) .countdown-label', en: 'Minutes', ta: '\u0ba8\u0bbf\u0bae\u0bbf\u0b9f\u0b99\u0bcd\u0b95\u0bb3\u0bcd' },
    { sel: '.countdown-item:nth-child(4) .countdown-label', en: 'Seconds', ta: '\u0bb5\u0bbf\u0ba9\u0bbe\u0b9f\u0bbf\u0b95\u0bb3\u0bcd' },
    { sel: '.countdown-message', en: 'Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.', ta: '\u0b8e\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0b95\u0bc1\u0b9f\u0bc1\u0bae\u0bcd\u0baa\u0ba4\u0bcd\u0ba4\u0bbf\u0ba9\u0bb0\u0bcd \u0b89\u0b99\u0bcd\u0b95\u0bb3\u0bcd \u0bb5\u0bb0\u0bc1\u0b95\u0bc8\u0baf\u0bc8 \u0b86\u0bb5\u0bb2\u0bc1\u0b9f\u0ba9\u0bcd \u0b8e\u0ba4\u0bbf\u0bb0\u0bcd\u0baa\u0bbe\u0bb0\u0bcd\u0b95\u0bcd\u0b95\u0bbf\u0ba9\u0bcd\u0bb1\u0ba9\u0bb0\u0bcd.' },
    // Footer
    { sel: '.footer > p:first-of-type', en: 'Arivalan &amp; Akshaya &middot; 29 May 2026', ta: 'அறிவாளன் &amp; அக்‌ஷயா &middot; 29 \u0bae\u0bc7 2026' },
    { sel: '.footer-small', en: 'Made with \u2665', ta: '\u2665 \u0b89\u0b9f\u0ba9\u0bcd \u0b89\u0bb0\u0bc1\u0bb5\u0bbe\u0b95\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0b9f\u0bcd\u0b9f\u0ba4\u0bc1' },
    { sel: '#shareBtn .btn-text', en: 'Share Invitation', ta: '\u0b85\u0bb4\u0bc8\u0baa\u0bcd\u0baa\u0bbf\u0ba4\u0bb4\u0bc8 \u0baa\u0b95\u0bbf\u0bb0\u0bb5\u0bc1\u0bae\u0bcd' },
    // Loading
    { sel: '.loading-text', en: 'Arivalan &amp; Akshaya', ta: 'அறிவாளன் &amp; அக்‌ஷயா' }
  ];

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'ta' : 'en';
      translations.forEach(function (t) {
        var el = document.querySelector(t.sel);
        if (el) el.innerHTML = t[currentLang];
      });
      if (langToggleLabel) {
        langToggleLabel.textContent = currentLang === 'en' ? '\u0ba4' : 'EN';
      }
      langToggle.classList.toggle('active', currentLang === 'ta');
      langToggle.setAttribute('aria-label', currentLang === 'en' ? 'Switch to Tamil' : 'Switch to English');
      document.documentElement.lang = currentLang;
    });
  }

  /* ---------- DEV: FONT PICKER ---------- */
  var fontPicker = document.getElementById('devFontPicker');
  if (fontPicker) {
    var fontBtns = fontPicker.querySelectorAll('.dev-font-btn');
    fontBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var font = btn.getAttribute('data-font');
        document.documentElement.style.setProperty('--font-display', font);
        fontBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
    });
  }

})();
