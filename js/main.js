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
      }, 1000);
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

  /* ---------- SHARE BUTTON ---------- */
  var shareBtn = document.getElementById('shareBtn');

  /* ---------- TRAVEL BY TRAIN ---------- */
  var trainData = {
    chennai: {
      station: 'Chennai (MS / TBM)',
      trains: [
        { number: '16127', name: 'MS Guruvayur Express', dep: '11:07, May 28', arr: '21:10, May 28', duration: '~10h 03m', frequency: 'Daily', board: 'Board May 28' },
        { number: '12633', name: 'Kanyakumari Express', dep: '17:20, May 28', arr: '03:10, May 29', duration: '~9h 50m', frequency: 'Daily', board: 'Board May 28' },
        { number: '20605', name: 'MS TCN SF Express', dep: '16:00, May 28', arr: '04:10, May 29', duration: '~12h 10m', frequency: 'Daily', board: 'Board May 28' },
        { number: '12667', name: 'MS Cape SF Express', dep: '19:30, May 28', arr: '04:55, May 29', duration: '~9h 25m', frequency: 'Daily', board: 'Board May 28' },
        { number: '20635', name: 'Anantapuri Express', dep: '20:17, May 28', arr: '06:00, May 29', duration: '~9h 43m', frequency: 'Daily', board: 'Board May 28' },
        { number: '12631', name: 'Nellai SF Express', dep: '20:50, May 28', arr: '07:00, May 29', duration: '~10h 10m', frequency: 'Daily', board: 'Board May 28' },
        { number: '20683', name: 'TBM SCT SF Express', dep: '20:50, May 28', arr: '08:45, May 29', duration: '~11h 55m', frequency: 'Tue, Thu, Sun', board: 'Board May 28' },
        { number: '20691', name: 'TBM-NCJ Antyodaya Express', dep: '22:40, May 28', arr: '10:50, May 29', duration: '~12h 10m', frequency: 'Thu', board: 'Board May 28' },
        { number: '20627', name: 'Vande Bharat Express', dep: '05:00, May 28', arr: '12:38, May 28', duration: '~7h 38m', frequency: 'Daily (exc Wed)', board: 'Board May 28' },
        { number: '20665', name: 'TEN Vande Bharat', dep: '15:10, May 28', arr: '23:00, May 28', duration: '~7h 50m', frequency: 'Daily (exc Tue)', board: 'Board May 28' }
      ]
    },
    bengaluru: {
      station: 'KSR Bengaluru (SMVB)',
      trains: [
        { number: '17235', name: 'Nagercoil Express', dep: '17:15, May 28', arr: '05:10, May 29', duration: '~11h 55m', frequency: 'Daily', board: 'Board May 28' },
        { number: '11021', name: 'Dadar TEN Express', dep: '21:20, May 28', arr: '10:40, May 29', duration: '~13h 20m', frequency: 'Thu', board: 'Board May 28' }
      ]
    },
    coimbatore: {
      station: 'Coimbatore Jn (CBE)',
      trains: [
        { number: '16322', name: 'CBE-NCJ Express', dep: '08:00, May 28', arr: '17:55, May 28', duration: '~9h 55m', frequency: 'Daily', board: 'Board May 28' },
        { number: '22668', name: 'CBE NCJ SF Express', dep: '19:30, May 28', arr: '02:55, May 29', duration: '~7h 25m', frequency: 'Daily', board: 'Board May 28' }
      ]
    },
    madurai: {
      station: 'Madurai Jn (MDU)',
      trains: [
        { number: '16731', name: 'PGT-TCN Express', dep: '11:00, May 28', arr: '13:40, May 28', duration: '~2h 40m', frequency: 'Daily', board: 'Board May 28' },
        { number: '16322', name: 'CBE-NCJ Express', dep: '14:30, May 28', arr: '17:55, May 28', duration: '~3h 25m', frequency: 'Daily', board: 'Board May 28' },
        { number: '16845', name: 'ED-SCT Express', dep: '18:00, May 28', arr: '20:25, May 28', duration: '~2h 25m', frequency: 'Daily', board: 'Board May 28' },
        { number: '16127', name: 'MS Guruvayur Express', dep: '18:45, May 28', arr: '21:10, May 28', duration: '~2h 25m', frequency: 'Daily', board: 'Board May 28' },
        { number: '17069', name: 'HYB Cape Express', dep: '22:00, May 28', arr: '00:20, May 29', duration: '~2h 20m', frequency: 'Thu', board: 'Board May 28' },
        { number: '07230', name: 'HYB Cape Special', dep: '21:50, May 28', arr: '00:23, May 29', duration: '~2h 33m', frequency: 'Thu', board: 'Board May 28' },
        { number: '16729', name: 'MDU Punalur Express', dep: '23:15, May 28', arr: '01:40, May 29', duration: '~2h 25m', frequency: 'Daily', board: 'Board May 28' },
        { number: '12667', name: 'MS Cape SF Express', dep: '02:35, May 29', arr: '04:55, May 29', duration: '~2h 20m', frequency: 'Daily', board: 'Board May 29' },
        { number: '16707', name: 'MAJN TEN Express', dep: '04:20, May 29', arr: '07:45, May 29', duration: '~3h 25m', frequency: 'Daily', board: 'Board May 29' },
        { number: '20627', name: 'Vande Bharat Express', dep: '10:40, May 28', arr: '12:38, May 28', duration: '~1h 58m', frequency: 'Daily (exc Wed)', board: 'Board May 28' },
        { number: '20665', name: 'TEN Vande Bharat', dep: '20:50, May 28', arr: '23:00, May 28', duration: '~2h 10m', frequency: 'Daily (exc Tue)', board: 'Board May 28' }
      ]
    },
    trichy: {
      station: 'Tiruchirappalli Jn (TPJ)',
      trains: [
        { number: '22627', name: 'TPJ TVC SF Express', dep: '07:15, May 28', arr: '11:45, May 28', duration: '~4h 30m', frequency: 'Daily', board: 'Board May 28' },
        { number: '16127', name: 'MS Guruvayur Express', dep: '16:20, May 28', arr: '21:10, May 28', duration: '~4h 50m', frequency: 'Daily', board: 'Board May 28' },
        { number: '17069', name: 'HYB Cape Express', dep: '19:45, May 28', arr: '00:20, May 29', duration: '~4h 35m', frequency: 'Thu', board: 'Board May 28' },
        { number: '07230', name: 'HYB Cape Special', dep: '19:15, May 28', arr: '00:23, May 29', duration: '~5h 08m', frequency: 'Thu', board: 'Board May 28' },
        { number: '12633', name: 'Kanyakumari Express', dep: '22:30, May 28', arr: '03:10, May 29', duration: '~4h 40m', frequency: 'Daily', board: 'Board May 28' },
        { number: '20605', name: 'MS TCN SF Express', dep: '23:50, May 28', arr: '04:10, May 29', duration: '~4h 20m', frequency: 'Daily', board: 'Board May 28' },
        { number: '12667', name: 'MS Cape SF Express', dep: '00:30, May 29', arr: '04:55, May 29', duration: '~4h 25m', frequency: 'Daily', board: 'Board May 29' },
        { number: '20627', name: 'Vande Bharat Express', dep: '09:00, May 28', arr: '12:38, May 28', duration: '~3h 38m', frequency: 'Daily (exc Wed)', board: 'Board May 28' },
        { number: '20665', name: 'TEN Vande Bharat', dep: '19:05, May 28', arr: '23:00, May 28', duration: '~3h 55m', frequency: 'Daily (exc Tue)', board: 'Board May 28' }
      ]
    },
    thiruthuraipoondi: {
      station: 'Thiruthuraipoondi (TTP)',
      trains: [
        { number: '20683', name: 'TBM SCT SF Express', dep: '02:28, May 28', arr: '08:45, May 28', duration: '~6h 17m', frequency: 'Tue, Thu, Sun', board: 'Board May 28 (Thu)' }
      ]
    }
  };

  var citySelector = document.getElementById('citySelector');
  var trainList = document.getElementById('trainList');
  var trainListWrap = document.getElementById('trainListWrap');
  var trainListFade = document.getElementById('trainListFade');
  var showMoreBtn = document.getElementById('showMoreBtn');
  var trainControls = document.getElementById('trainControls');
  var filterDaily = document.getElementById('filterDaily');
  var filterNoVB = document.getElementById('filterNoVB');

  var currentCity = 'chennai';
  var currentSort = 'arrival';

  var trainLabels = {
    dep: { en: 'Dep:', ta: 'புறப்பாடு:' },
    arr: { en: 'Arr:', ta: 'வருகை:' },
    noTrains: { en: 'No trains match the current filters.', ta: 'தேடலுக்குப் பொருந்தும் ரயில்கள் இல்லை.' },
    showAll: { en: 'Show All Trains', ta: 'அனைத்து ரயில்களையும் காட்டு' },
    showLess: { en: 'Show Less', ta: 'குறைவாகக் காட்டு' },
    board: { en: 'Board', ta: 'கிளம்பவும்' },
    frequency: {
      'Daily': 'தினமும்',
      'Thu': 'வியா',
      'Tue, Thu, Sun': 'செவ், வியா, ஞாயி',
      'Daily (exc Wed)': 'தினமும் (புதன் தவிர)',
      'Daily (exc Tue)': 'தினமும் (செவ் தவிர)'
    },
    may: { en: 'May', ta: 'மே' }
  };

  function parseTime(str) {
    var timePart = str.split(',')[0].trim();
    var parts = timePart.split(':');
    var h = parseInt(parts[0], 10);
    var m = parseInt(parts[1], 10);
    var val = h * 60 + m;
    if (str.indexOf('May 29') !== -1) val += 1440;
    return val;
  }

  function parseDuration(str) {
    var match = str.match(/(\d+)h\s*(\d+)m/);
    if (!match) return 9999;
    return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  }

  function isVandeBharat(t) {
    var n = t.name.toLowerCase();
    return n.indexOf('vande bharat') !== -1 || n.indexOf('vandebharat') !== -1;
  }

  function getSortedFiltered(city) {
    var data = trainData[city];
    if (!data) return [];
    var trains = data.trains.slice();

    if (filterDaily && filterDaily.checked) {
      trains = trains.filter(function (t) { return t.frequency.toLowerCase().indexOf('daily') === 0; });
    }
    if (filterNoVB && filterNoVB.checked) {
      trains = trains.filter(function (t) { return !isVandeBharat(t); });
    }

    if (currentSort === 'arrival') {
      trains.sort(function (a, b) {
        var va = isVandeBharat(a) ? 1 : 0;
        var vb = isVandeBharat(b) ? 1 : 0;
        if (va !== vb) return va - vb;
        return parseTime(a.arr) - parseTime(b.arr);
      });
    } else if (currentSort === 'departure') {
      trains.sort(function (a, b) {
        var va = isVandeBharat(a) ? 1 : 0;
        var vb = isVandeBharat(b) ? 1 : 0;
        if (va !== vb) return va - vb;
        return parseTime(a.dep) - parseTime(b.dep);
      });
    } else if (currentSort === 'duration') {
      trains.sort(function (a, b) {
        var va = isVandeBharat(a) ? 1 : 0;
        var vb = isVandeBharat(b) ? 1 : 0;
        if (va !== vb) return va - vb;
        return parseDuration(a.duration) - parseDuration(b.duration);
      });
    }
    return trains;
  }

  function renderTrains(city) {
    if (!trainList) return;
    var data = trainData[city];
    if (!data) return;
    var trains = getSortedFiltered(city);

    if (trains.length === 0) {
      trainList.innerHTML = '<p style="text-align:center;color:var(--dark-muted);padding:2rem 0;">' + trainLabels.noTrains[currentLang] + '</p>';
      updateShowMore();
      return;
    }

    var html = '';
    trains.forEach(function (t) {
      var vb = isVandeBharat(t);
      html += '<div class="train-card' + (vb ? ' vande-bharat' : '') + '">' +
        '<div class="train-header">' +
          '<span class="train-name">' + t.name + '</span>' +
          '<span class="train-number">#' + t.number + '</span>' +
        '</div>' +
        '<div class="train-details">' +
          '<span class="train-detail">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
            '<span>' + trainLabels.dep[currentLang] + ' <strong>' + (currentLang === 'ta' ? t.dep.replace(/May/g, 'மே') : t.dep) + '</strong></span>' +
          '</span>' +
          '<span class="train-detail">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
            '<span>' + trainLabels.arr[currentLang] + ' <strong>' + (currentLang === 'ta' ? t.arr.replace(/May/g, 'மே') : t.arr) + '</strong></span>' +
          '</span>' +
          '<span class="train-detail">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' +
            '<span>' + t.duration + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="train-footer">' +
          '<span class="train-frequency">' + (currentLang === 'ta' && trainLabels.frequency[t.frequency] ? trainLabels.frequency[t.frequency] : t.frequency) + '</span>' +
          '<span class="train-board">' + (currentLang === 'ta' ? t.board.replace('Board', trainLabels.board.ta).replace(/May/g, trainLabels.may.ta) : t.board) + '</span>' +
        '</div>' +
      '</div>';
    });
    trainList.innerHTML = html;
    updateShowMore();
  }

  function collapseList() {
    if (trainListWrap) {
      trainListWrap.classList.remove('expanded');
    }
    if (showMoreBtn) {
      showMoreBtn.classList.remove('expanded');
      var txtEl = showMoreBtn.querySelector('.show-more-text');
      if (txtEl) txtEl.textContent = trainLabels.showAll[currentLang];
    }
  }

  function updateShowMore() {
    if (!trainListWrap || !showMoreBtn) return;
    var needsExpand = trainListWrap.scrollHeight > trainListWrap.clientHeight + 10;
    var isExpanded = trainListWrap.classList.contains('expanded');
    showMoreBtn.style.display = (needsExpand || isExpanded) ? '' : 'none';
    if (trainListFade) {
      trainListFade.style.display = needsExpand && !isExpanded ? '' : 'none';
    }
  }

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      var isExpanded = trainListWrap.classList.toggle('expanded');
      showMoreBtn.classList.toggle('expanded', isExpanded);
      var txtEl = showMoreBtn.querySelector('.show-more-text');
      if (txtEl) txtEl.textContent = isExpanded ? trainLabels.showLess[currentLang] : trainLabels.showAll[currentLang];
      if (trainListFade) trainListFade.style.display = isExpanded ? 'none' : '';
    });
  }

  if (trainControls) {
    trainControls.addEventListener('click', function (e) {
      var btn = e.target.closest('.sort-btn');
      if (!btn) return;
      currentSort = btn.getAttribute('data-sort');
      trainControls.querySelectorAll('.sort-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderTrains(currentCity);
    });
  }

  if (filterDaily) {
    filterDaily.addEventListener('change', function () { renderTrains(currentCity); });
  }
  if (filterNoVB) {
    filterNoVB.addEventListener('change', function () { renderTrains(currentCity); });
  }

  if (citySelector) {
    collapseList();
    renderTrains('chennai');

    citySelector.addEventListener('click', function (e) {
      var btn = e.target.closest('.city-btn');
      if (!btn) return;
      currentCity = btn.getAttribute('data-city');
      citySelector.querySelectorAll('.city-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      collapseList();
      renderTrains(currentCity);
    });
  }

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
    { sel: '.hero-subtitle', en: 'Wedding Invitation', ta: 'திருமண அழைப்பிதழ்' },
    { sel: '.hero-groom', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.weds-text', en: 'Weds', ta: 'உடன்' },
    { sel: '.hero-bride', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Invocation
    { sel: '.blessing-text', en: 'With love and blessings', ta: 'அன்புடனும் ஆசியுடனும்' },
    { sel: '.parent-group:first-child .parent-label', en: 'Parents of the Groom', ta: 'மணமகனின் பெற்றோர்' },
    { sel: '.parent-group:last-child .parent-label', en: 'Parents of the Bride', ta: 'மணமகளின் பெற்றோர்' },
    { sel: '.invite-label', en: 'Cordially invite you', ta: 'திருமண விழாவிற்கு' },
    { sel: '.invite-sub', en: 'to join in the wedding celebrations of', ta: 'அன்புடன் அழைக்கின்றனர்' },
    { sel: '.couple-name.groom-name', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.couple-amp', en: '&', ta: '&' },
    { sel: '.couple-name.bride-name', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Parent names
    { sel: '.parent-group:first-child .parent-name', en: 'Dr. C. Paramasivan &amp; Dr. A. Muthu Tamilarasi', ta: 'முனைவர் செ. பரமசிவன் &amp; முனைவர் ஆ. முத்து தமிழரசி' },
    { sel: '.parent-group:last-child .parent-name', en: 'Mr. Manivannan &amp; Mrs. D. Umarani', ta: 'திரு. ஜெ. மணிவண்ணன் &amp; திருமதி. தெ. உமாராணி' },
    // Events
    { sel: '#events .section-label', en: 'Save the Date', ta: 'நாள்' },
    { sel: '#events .section-title', en: 'Wedding Day', ta: 'திருமண நாள்' },
    { sel: '.event-date-main', en: 'Friday, May 29th, 2026', ta: 'வெள்ளிக்கிழமை, மே 29, 2026' },
    { sel: '.timeline-item:first-child .event-name', en: 'Muhurtham', ta: 'முகூர்த்தம்' },
    { sel: '.timeline-item:first-child .event-time', en: '9:00 AM – 10:00 AM', ta: 'காலை 9:00 – 10:00' },
    { sel: '.timeline-item:first-child .event-venue', en: 'Arulmigu Sri Malai Parvathi Amman Temple', ta: 'அருள்மிகு ஸ்ரீ மலை பார்வதி அம்மன் கோவில்' },
    { sel: '.timeline-item:first-child .event-venue-sub', en: 'Atop a scenic hill near Tirunelveli', ta: 'திருநெல்வேலி அருகில் ஒரு மலைமேல்' },
    { sel: '.timeline-item:first-child .event-map-btn:first-child .btn-text', en: 'Temple Location', ta: 'கோவில் இடம்' },
    { sel: '.timeline-item:first-child .event-map-btn-alt .btn-text', en: 'Car Parking', ta: 'வாகன நிறுத்தம்' },
    { sel: '.timeline-item:last-child .event-name', en: 'Wedding Reception', ta: 'திருமண வரவேற்பு' },
    { sel: '.timeline-item:last-child .event-time', en: '11:30 AM onwards', ta: 'காலை 11:30 முதல்' },
    { sel: '.timeline-item:last-child .event-venue', en: 'Maharaasi Mahal, Tirunelveli', ta: 'மகாராசி மஹால், திருநெல்வேலி' },
    { sel: '.timeline-item:last-child .event-venue-sub', en: '~19 km from the temple', ta: 'கோவிலிலிருந்து ~19 கி.மீ.' },
    { sel: '.timeline-item:last-child .event-map-btn .btn-text', en: 'See the route', ta: 'வழியைக் காண' },
    // Kural
    { sel: '.kural-meaning', en: '“The loveless possess everything for themselves;<br>the loving give even their bones for others.”', ta: '“அன்பு இல்லாதவர்கள் எல்லாம் தமக்கே உரியவர்கள்;<br>அன்பு உடையவர்கள் தம் எலும்பையும் பிறருக்கு உரியதாக்குவர்.”' },
    { sel: '.kural-source', en: '— Thirukkural, Kural 72', ta: ', திருக்குறள், குறள் 72' },
    // Couple
    { sel: '#couple .section-label', en: 'meet the', ta: 'சந்தியுங்கள்' },
    { sel: '#couple .section-title', en: 'Bride &amp; Groom', ta: 'மணமக்கள்' },
    { sel: '.groom-photo .photo-name', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.bride-photo .photo-name', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    { sel: '.couple-message p:first-child', en: 'We are both so delighted that you are able to join us in celebrating what we hope will be one of the happiest days of our lives. The affection shown to us by so many people has been incredibly moving, and has touched us both deeply.', ta: 'எங்கள் வாழ்வின் மிக மகிழ்ச்சியான நாளில் நீங்கள் கலந்துகொள்வது எங்களுக்கு மிகவும் மகிழ்ச்சி அளிக்கிறது. பலரின் அன்பும் ஆசிகளும் எங்களை ஆழமாக தொட்டுள்ளன.' },
    { sel: '.couple-message p:last-child', en: 'We would like to take this opportunity to thank everyone most sincerely for their kindness. We are looking forward to seeing you at the wedding.', ta: 'அனைவருக்கும் மனமார்ந்த நன்றியைத் தெரிவித்துக்கொள்கிறோம். திருமணத்தில் உங்களைச் சந்திக்க ஆவலுடன் காத்திருக்கிறோம்.' },
    // Gallery
    { sel: '#gallery .section-label', en: 'our', ta: 'எங்கள்' },
    { sel: '#gallery .section-title', en: 'Gallery', ta: 'புகைப்படத் தொகுப்பு' },
    { sel: '.gallery-hint', en: '← Swipe to see more →', ta: '← மேலும் காண →' },
    // RSVP - commented out in HTML
    // Info
    { sel: '#info .section-label', en: 'A few', ta: 'சில' },
    { sel: '#info .section-title', en: 'Things to Know', ta: 'தெரிந்துகொள்ள வேண்டியவை' },
    { sel: '.info-intro', en: 'To help you feel at ease and enjoy every moment of the celebrations, we’ve gathered a few thoughtful details we’d love for you to know before the big day.', ta: 'விழாவின் ஒவ்வொரு தருணத்தையும் நீங்கள் மகிழ்ச்சியாக அனுபவிக்க, சில முக்கியமான தகவல்களை உங்களுக்குத் தெரிவிக்க விரும்புகிறோம்.' },
    { sel: '.info-grid .info-card:nth-child(1) .info-title', en: 'Weather', ta: 'வானிலை' },
    { sel: '.info-grid .info-card:nth-child(1) .info-desc', en: 'It will be warm and sunny with temperatures reaching up to 42°C. Light, breathable attire is recommended.', ta: 'வெப்பநிலை 42°C வரை இருக்கும். இலகுவான ஆடைகளை அணியவும்.' },
    { sel: '.info-grid .info-card:nth-child(2) .info-title', en: 'Parking', ta: 'வாகன நிறுத்தம்' },
    { sel: '.info-grid .info-card:nth-child(2) .info-desc', en: '<a href="https://maps.app.goo.gl/HpBWswTSFMNCj8PG6" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;">Dedicated parking</a> is available at the base of the temple hill. Parking is also available at <a href="https://www.google.com/maps/search/Maharaasi+Mahal+Tirunelveli" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;">Maharaasi Mahal</a>.', ta: 'கோவில் மலை அடிவாரத்தில் <a href="https://maps.app.goo.gl/HpBWswTSFMNCj8PG6" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;">பிரத்யேக வாகன நிறுத்தம்</a> உள்ளது. <a href="https://www.google.com/maps/search/Maharaasi+Mahal+Tirunelveli" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;">மகாராசி மஹால்</a> இலும் வாகன நிறுத்தம் உள்ளது.' },
    // Social
    { sel: '.follow-text-1', en: 'Follow', ta: 'தொடருங்கள்' },
    { sel: '.follow-text-2', en: 'the', ta: '' },
    { sel: '.follow-text-3', en: 'action', ta: 'நிகழ்வுகளை' },
    { sel: '.instagram-btns .instagram-btn:first-child .btn-text', en: 'Arivalan', ta: 'அறிவாளன்' },
    { sel: '.instagram-btns .instagram-btn:last-child .btn-text', en: 'Akshaya', ta: 'அக்‌ஷயா' },
    // Countdown
    { sel: '#countdown .section-label', en: 'The', ta: '' },
    { sel: '#countdown .section-title', en: 'Countdown Begins', ta: 'நாள் எண்ணிக்கை' },
    { sel: '.countdown-item:nth-child(1) .countdown-label', en: 'Days', ta: 'நாட்கள்' },
    { sel: '.countdown-item:nth-child(2) .countdown-label', en: 'Hours', ta: 'மணி' },
    { sel: '.countdown-item:nth-child(3) .countdown-label', en: 'Minutes', ta: 'நிமிடங்கள்' },
    { sel: '.countdown-item:nth-child(4) .countdown-label', en: 'Seconds', ta: 'வினாடிகள்' },
    { sel: '.countdown-message', en: 'Our families are excited that you are able to join us in celebrating what we hope will be one of the happiest days of our lives.', ta: 'எங்கள் குடும்பத்தினர் உங்கள் வருகையை ஆவலுடன் எதிர்பார்க்கின்றனர்.' },
    // Footer
    { sel: '.footer > p:first-of-type', en: 'Arivalan &amp; Akshaya &middot; 29 May 2026', ta: 'அறிவாளன் &amp; அக்‌ஷயா &middot; 29 மே 2026' },
    // Travel
    { sel: '#travel .section-label', en: 'How to', ta: 'எப்படி' },
    { sel: '#travel .section-title', en: 'Reach Tirunelveli', ta: 'திருநெல்வேலி செல்வது' },
    { sel: '.travel-intro', en: 'Muhurtham is at 9:00 AM on Friday, May 29th. Here are recommended trains to arrive in time.', ta: 'முகூர்த்தம் வெள்ளிக்கிழமை, மே 29 காலை 9:00 மணிக்கு. சரியான நேரத்தில் வர பரிந்துரைக்கப்படும் ரயில்கள்.' },
    // Attractions
    { sel: '#attractions .section-label', en: 'Explore', ta: 'அறியுங்கள்' },
    { sel: '#attractions .section-title', en: 'Nearby Attractions', ta: 'அருகில் சுற்றுலா இடங்கள்' },
    { sel: '.attractions-intro', en: 'If you’re travelling from afar, Tirunelveli has much to offer. Here are a few places worth visiting.', ta: 'தூரத்திலிருந்து வருபவர்களுக்கு திருநெல்வேலியில் பார்க்க வேண்டிய இடங்கள்.' },
    { sel: '.travel-note', en: 'Timings are approximate. Please verify schedules before booking.', ta: 'நேரங்கள் தோராயமானவை. பயணத்திற்கு முன் சரிபார்க்கவும்.' },
    { sel: '.irctc-btn .btn-text', en: 'Book on IRCTC', ta: 'IRCTC-யில் பதிவு செய்க' },
    { sel: '.sort-label', en: 'Sort by', ta: 'வரிசை' },
    { sel: '.sort-btn[data-sort="arrival"]', en: 'Arrival', ta: 'வருகை' },
    { sel: '.sort-btn[data-sort="departure"]', en: 'Departure', ta: 'புறப்பாடு' },
    { sel: '.sort-btn[data-sort="duration"]', en: 'Duration', ta: 'காலம்' },
    { sel: '.show-more-text', en: 'Show All Trains', ta: 'அனைத்து ரயில்கள்' },
    { sel: '.footer-small', en: 'Made with ♥', ta: '♥ உடன் உருவாக்கப்பட்டது' },
    { sel: '#shareBtn .btn-text', en: 'Share Invitation', ta: 'அழைப்பிதழை பகிரவும்' },
    // Loading
    { sel: '.loading-text', en: 'Arivalan &amp; Akshaya', ta: 'அறிவாளன் &amp; அக்‌ஷயா' },
    // Attraction names
    { sel: '.attractions-grid .attraction-card:nth-child(1) .attraction-name', en: 'Tirunelveli Halwa', ta: 'திருநெல்வேலி அல்வா' },
    { sel: '.attractions-grid .attraction-card:nth-child(2) .attraction-name', en: 'Nellaiappar Temple', ta: 'நெல்லையப்பர் கோவில்' },
    { sel: '.attractions-grid .attraction-card:nth-child(3) .attraction-name', en: 'Sivakalai Archaeological Site', ta: 'சிவகளை அகழாய்வு' },
    { sel: '.attractions-grid .attraction-card:nth-child(4) .attraction-name', en: 'Adichanallur Archaeological Site', ta: 'ஆதிச்சநல்லூர் அகழாய்வு' },
    { sel: '.attractions-grid .attraction-card:nth-child(5) .attraction-name', en: 'Vallanadu Blackbuck Sanctuary', ta: 'வள்ளநாடு வெளிமான் சரணாலயம்' },
    { sel: '.attractions-grid .attraction-card:nth-child(6) .attraction-name', en: 'Manimutharu Falls', ta: 'மணிமுத்தாறு அருவி' },
    { sel: '.attractions-grid .attraction-card:nth-child(7) .attraction-name', en: 'Agasthiyar Falls', ta: 'அகத்தியர் அருவி' },
    { sel: '.attractions-grid .attraction-card:nth-child(8) .attraction-name', en: 'Courtallam Falls', ta: 'குற்றாலம் அருவி' },
    { sel: '.attractions-grid .attraction-card:nth-child(9) .attraction-name', en: 'Tiruchendur Murugan Temple', ta: 'திருச்செந்தூர் முருகன் கோவில்' },
    // Attraction descriptions
    { sel: '.attractions-grid .attraction-card:nth-child(1) .attraction-desc', en: 'Don’t leave without the legendary wheat halwa. Skip the overrated Iruttu Kadai — try <a href="https://maps.app.goo.gl/FDzMyCoymCQKwmcEA" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;font-weight:600;">Santhi Sweets</a> instead for the real deal!', ta: 'புகழ்பெற்ற கோதுமை அல்வா சுவைக்காமல் செல்லாதீர்கள். இருட்டுக்கடையைத் தவிர்த்து ,<a href="https://maps.app.goo.gl/FDzMyCoymCQKwmcEA" target="_blank" rel="noopener noreferrer" style="color:var(--maroon);text-decoration:underline;font-weight:600;">சாந்தி ஸ்வீட்ஸ்</a> முயற்சியுங்கள்!' },
    { sel: '.attractions-grid .attraction-card:nth-child(2) .attraction-desc', en: 'Ancient Shiva temple with stunning Dravidian architecture and the famous musical pillars.', ta: 'அழகிய திராவிட கட்டிடக்கலை மற்றும் புகழ்பெற்ற இசைத் தூண்களைக் கொண்ட பண்டைய சிவன் கோவில்.' },
    { sel: '.attractions-grid .attraction-card:nth-child(3) .attraction-desc', en: 'A significant archaeological excavation site revealing ancient Tamil civilisation artefacts and heritage.', ta: 'பண்டைய தமிழ் நாகரிக தொல்பொருட்களை வெளிக்கொணரும் முக்கியமான தொல்பொருள் அகழ்வாய்வு நிலையம்.' },
    { sel: '.attractions-grid .attraction-card:nth-child(4) .attraction-desc', en: 'An ancient burial site dating back 3,800 years — one of the most important archaeological discoveries in India.', ta: '3,800 ஆண்டுகள் பழமையான புதைகுழி , இந்தியாவின் மிக முக்கியமான தொல்பொருள் கண்டுபிடிப்புகளில் ஒன்று.' },
    { sel: '.attractions-grid .attraction-card:nth-child(5) .attraction-desc', en: 'A wildlife sanctuary home to the endangered Indian blackbuck — a rare sight in Tamil Nadu.', ta: 'அருகிவரும் இந்திய வெளிமானின் வாழிடம் , தமிழ்நாட்டில் அரிதான காட்சி.' },
    { sel: '.attractions-grid .attraction-card:nth-child(6) .attraction-desc', en: 'A beautiful waterfall nestled in the Western Ghats — a serene spot for nature lovers.', ta: 'மேற்குத் தொடர்ச்சி மலையில் அமைந்த அழகிய அருவி , இயற்கை ஆர்வலர்களுக்கான அமைதியான இடம்.' },
    { sel: '.attractions-grid .attraction-card:nth-child(7) .attraction-desc', en: 'A scenic waterfall near Papanasam, believed to be blessed by Sage Agasthiyar.', ta: 'பாபநாசம் அருகே உள்ள இயற்கை எழில் கொஞ்சும் அருவி, அகத்திய முனிவரின் அருளால் புனிதமானது.' },
    { sel: '.attractions-grid .attraction-card:nth-child(8) .attraction-desc', en: 'The “Spa of South India” — scenic waterfalls surrounded by the Western Ghats, ~60 km away.', ta: '“தென் இந்தியாவின் ஆரோக்கிய நீரூற்று” , மேற்குத் தொடர்ச்சி மலைகளால் சூழப்பட்ட அழகிய அருவிகள், ~60 கி.மீ. தொலைவில்.' },
    { sel: '.attractions-grid .attraction-card:nth-child(9) .attraction-desc', en: 'One of the six abodes of Lord Murugan, a magnificent seaside temple ~80 km from the city.', ta: 'முருகப் பெருமானின் ஆறுபடை வீடுகளில் ஒன்று, நகரத்திலிருந்து ~80 கி.மீ. தொலைவிலுள்ள கடலோர கோவில்.' },
    // Attraction links
    { selAll: '.attraction-link', en: 'View on Map →', ta: 'வரைபடத்தில் காண →' },
    // City buttons
    { sel: '.city-btn[data-city="chennai"]', en: 'Chennai', ta: 'சென்னை' },
    { sel: '.city-btn[data-city="bengaluru"]', en: 'Bengaluru', ta: 'பெங்களூர்' },
    { sel: '.city-btn[data-city="coimbatore"]', en: 'Coimbatore', ta: 'கோயம்புத்தூர்' },
    { sel: '.city-btn[data-city="madurai"]', en: 'Madurai', ta: 'மதுரை' },
    { sel: '.city-btn[data-city="trichy"]', en: 'Trichy', ta: 'திருச்சி' },
    { sel: '.city-btn[data-city="thiruthuraipoondi"]', en: 'Thiruthuraipoondi', ta: 'திருத்துறைப்பூண்டி' },
    // Filters
    { sel: '#filterDaily + span', en: 'Daily only', ta: 'தினமும் மட்டும்' },
    { sel: '#filterNoVB + span', en: 'Hide Vande Bharat', ta: 'வந்தே பாரத் மறை' },
    // Reception car parking
    { sel: '.timeline-item:last-child .event-map-btn-alt .btn-text', en: 'Car Parking', ta: 'வாகன நிறுத்தம்' }
  ];

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'ta' : 'en';
      translations.forEach(function (t) {
        if (t.selAll) {
          var els = document.querySelectorAll(t.selAll);
          els.forEach(function (el) { el.innerHTML = t[currentLang]; });
        } else {
          var el = document.querySelector(t.sel);
          if (el) el.innerHTML = t[currentLang];
        }
      });
      collapseList();
      renderTrains(currentCity);
      if (langToggleLabel) {
        langToggleLabel.textContent = currentLang === 'en' ? 'த' : 'EN';
      }
      langToggle.classList.toggle('active', currentLang === 'ta');
      langToggle.setAttribute('aria-label', currentLang === 'en' ? 'Switch to Tamil' : 'Switch to English');
      document.documentElement.lang = currentLang;
    });
  }


})();
