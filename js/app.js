// app.js — main application bootstrap

document.addEventListener('DOMContentLoaded', function() {
  initAnimations();
  initMap();
  initCharts();
  buildSpeciesCarousel();
  buildSensorsGrid();
  buildTimeline();
  buildAlerts();
  updateReadingsDisplay();
  startRealTimeUpdates();
  setupEventListeners();
  applySavedTheme();

  setTimeout(function() {
    showToast('🌿 Live monitoring active — 127 sensors reporting', 'success', 5000);
  }, 1600);
});

// ── Species Carousel ──────────────────────────────────────────────────────────

function buildSpeciesCarousel() {
  var wrapper = document.getElementById('species-wrapper');
  if (!wrapper) return;

  BioData.species.forEach(function(sp) {
    var slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML =
      '<div class="sp-card">' +
        '<div class="sp-emoji">' + sp.emoji + '</div>' +
        '<div class="sp-badge" style="background:' + sp.statusColor + '22;color:' + sp.statusColor + ';border:1px solid ' + sp.statusColor + '">' + sp.status.toUpperCase() + '</div>' +
        '<h3 class="sp-name">' + sp.name + '</h3>' +
        '<em class="sp-latin">' + sp.latin + '</em>' +
        '<p class="sp-desc">' + sp.description + '</p>' +
        '<div class="sp-stats">' +
          '<div class="sp-stat"><span class="sp-val">' + sp.population + '</span><span class="sp-lbl">Population</span></div>' +
          '<div class="sp-stat"><span class="sp-val trend-up">+' + sp.trend + '%</span><span class="sp-lbl">Trend</span></div>' +
          '<div class="sp-stat"><span class="sp-val">' + sp.sightings + '</span><span class="sp-lbl">Sightings</span></div>' +
        '</div>' +
        '<div class="sp-habitat"><i class="fas fa-leaf"></i> ' + sp.habitat + '</div>' +
        '<div class="sp-mini-chart"><canvas id="mini-' + sp.id + '" height="55"></canvas></div>' +
        '<p class="sp-lastseen">Last seen: ' + sp.lastSeen + '</p>' +
      '</div>';
    wrapper.appendChild(slide);
  });

  new Swiper('.species-swiper', {
    slidesPerView:1, spaceBetween:24, loop:true,
    autoplay:{ delay:4500, disableOnInteraction:false, pauseOnMouseEnter:true },
    pagination:{ el:'.swiper-pagination', clickable:true },
    navigation:{ nextEl:'.swiper-button-next', prevEl:'.swiper-button-prev' },
    breakpoints:{ 640:{slidesPerView:2}, 1024:{slidesPerView:3}, 1440:{slidesPerView:4} }
  });

  setTimeout(function() {
    BioData.species.forEach(function(sp) {
      makeMiniChart('mini-' + sp.id, sp.populationHistory, sp.statusColor);
    });
  }, 400);
}

// ── Sensors Grid ──────────────────────────────────────────────────────────────

function buildSensorsGrid() {
  var grid = document.getElementById('sensors-grid');
  if (!grid) return;

  var types   = ['multimodal','temperature','humidity','sound','camera'];
  var statuses = ['active','active','active','active','active','warning','inactive'];
  var zones   = ['pittencrieff','townhill','duloch','brucefield','urban','hills'];
  var names   = ['Oak Ridge','Birch Glen','Heather Moor','Stream Bank','North Slope','Valley Edge','Ridge Top','Burn Side','East Meadow','West Hollow','South Rise','Cliff Face','River Bend'];
  var all = BioData.sensors.slice();

  for (var i = all.length + 1; i <= 24; i++) {
    var si = i - all.length - 1;
    all.push({
      id:'S'+( i<10?'0':'' )+( i<100?'0':'' )+i,
      name: names[si % names.length] + ' ' + i,
      type: types[Math.floor(Math.random()*types.length)],
      zone: zones[Math.floor(Math.random()*zones.length)],
      status: statuses[Math.floor(Math.random()*statuses.length)]
    });
  }

  all.forEach(function(sensor) {
    var r = generateReadings();
    var card = document.createElement('div');
    card.className = 'sensor-card';
    card.dataset.type = sensor.type;
    card.dataset.status = sensor.status;
    card.innerHTML =
      '<div class="sc-head">' +
        '<div class="sc-icon"><i class="fas ' + getSensorIcon(sensor.type) + '"></i></div>' +
        '<div class="sc-dot sc-dot-' + sensor.status + '"></div>' +
      '</div>' +
      '<div class="sc-id">' + sensor.id + '</div>' +
      '<div class="sc-name">' + sensor.name + '</div>' +
      '<div class="sc-type">' + sensor.type + '</div>' +
      '<div class="sc-readings">' +
        '<span>' + r.temp + '°C</span>' +
        '<span>' + r.humidity + '%</span>' +
      '</div>' +
      '<div class="sc-zone">' + sensor.zone + '</div>';

    card.addEventListener('click', function() {
      var msg = sensor.id + ': ' + sensor.name + ' — ' + getStatusLabel(sensor.status);
      var t = sensor.status === 'active' ? 'success' : sensor.status === 'warning' ? 'warning' : 'error';
      showToast(msg, t, 3500);
    });

    grid.appendChild(card);
  });
}

// ── Timeline ──────────────────────────────────────────────────────────────────

function buildTimeline() {
  var container = document.getElementById('timeline-container');
  if (!container) return;

  BioData.timeline.forEach(function(item, idx) {
    var typeColors = { milestone:'#1D9E75', tech:'#3498db', ecology:'#27AE60', wildlife:'#E67E22' };
    var color = typeColors[item.type] || '#1D9E75';
    var entry = document.createElement('div');
    entry.className = 'tl-entry';
    entry.setAttribute('data-aos', idx%2===0?'fade-right':'fade-left');
    entry.setAttribute('data-aos-delay', String(idx*40));
    entry.innerHTML =
      '<div class="tl-marker" style="border-color:' + color + ';box-shadow:0 0 0 4px ' + color + '22">' +
        '<span class="tl-icon">' + item.icon + '</span>' +
      '</div>' +
      '<div class="tl-content">' +
        '<div class="tl-meta">' +
          '<span class="tl-year">' + item.year + '</span>' +
          '<span class="tl-q">' + item.q + '</span>' +
          '<span class="tl-type" style="background:' + color + '22;color:' + color + '">' + item.type + '</span>' +
        '</div>' +
        '<h4>' + item.title + '</h4>' +
        '<p>' + item.desc + '</p>' +
      '</div>';
    container.appendChild(entry);
  });

  setTimeout(function() { AOS.refresh(); }, 100);
}

// ── Activity Alerts ───────────────────────────────────────────────────────────

function buildAlerts() {
  var list = document.getElementById('alerts-list');
  if (!list) return;
  var items = [
    { icon:'🦇', msg:'Bat activity detected — Sensor S003',    time:'2 min ago',  type:'info'    },
    { icon:'🌡️', msg:'Temperature spike at Townhill (+3°C)',    time:'15 min ago', type:'warning' },
    { icon:'🦉', msg:'Barn owl call recorded — S008',          time:'42 min ago', type:'success' },
    { icon:'📡', msg:'Sensor S011 reconnected',                time:'1 hr ago',   type:'info'    },
    { icon:'🦦', msg:'Otter sighting confirmed — Glen Bridge', time:'3 hr ago',   type:'success' },
  ];
  items.forEach(function(a) { appendAlert(list, a); });
}

function appendAlert(list, a) {
  var div = document.createElement('div');
  div.className = 'alert-item alert-' + a.type;
  div.innerHTML = '<span class="alert-icon">' + a.icon + '</span>' +
    '<div class="alert-body"><p>' + a.msg + '</p><span class="alert-time">' + a.time + '</span></div>';
  list.insertBefore(div, list.firstChild);
  while (list.children.length > 5) list.removeChild(list.lastChild);
}

// ── Real-time Simulation ──────────────────────────────────────────────────────

function updateReadingsDisplay() {
  var r = BioData.readings;
  var els = {
    'temp-value':     r.temperature.toFixed(1) + '°C',
    'humidity-value': Math.round(r.humidity) + '%',
    'aqi-value':      Math.round(r.aqi) + ' AQI',
    'sound-value':    Math.round(r.soundLevel) + ' dB'
  };
  Object.keys(els).forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== els[id]) {
      el.textContent = els[id];
      el.classList.add('val-updated');
      setTimeout(function() { el.classList.remove('val-updated'); }, 400);
    }
  });
}

function startRealTimeUpdates() {
  setInterval(function() {
    var r = BioData.readings;
    r.temperature  = Math.max(18, Math.min(28, r.temperature  + (Math.random()-0.5)*0.5));
    r.humidity     = Math.max(60, Math.min(90, r.humidity     + (Math.random()-0.5)*2));
    r.aqi          = Math.max(22, Math.min(60, r.aqi          + (Math.random()-0.5)*3));
    r.soundLevel   = Math.max(38, Math.min(65, r.soundLevel   + (Math.random()-0.5)*2));
    updateReadingsDisplay();
    if (Math.random() < 0.12) fireRandomAlert();
  }, 5000);
}

function fireRandomAlert() {
  var pool = [
    ['🦇 Bat ultrasound spike — Sensor S002', 'info'],
    ['🌡️ Temperature above average in Zone 2', 'warning'],
    ['🦉 Barn owl detected by camera trap',    'success'],
    ['🐿️ Red squirrel feeding station active', 'info'],
    ['🌧️ Rainfall sensor triggered — humidity rising', 'info'],
    ['🦦 Otter movement at Glen Bridge',       'success'],
    ['🔋 Sensor S007 battery low',             'warning'],
  ];
  var pick = pool[Math.floor(Math.random()*pool.length)];
  showToast(pick[0], pick[1], 4500);

  var list = document.getElementById('alerts-list');
  if (list) {
    appendAlert(list, { icon:pick[0].split(' ')[0], msg:pick[0].substring(pick[0].indexOf(' ')+1), time:'just now', type:pick[1] });
    if (typeof gsap !== 'undefined') {
      gsap.from(list.firstChild, { opacity:0, x:-18, duration:0.4, ease:'power2.out' });
    }
  }
}

// ── Event Listeners ───────────────────────────────────────────────────────────

function setupEventListeners() {
  // Hamburger
  var ham  = document.getElementById('hamburger');
  var navL = document.getElementById('nav-links');
  if (ham && navL) {
    ham.addEventListener('click', function() {
      navL.classList.toggle('nav-open');
      ham.classList.toggle('ham-active');
    });
    navL.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        navL.classList.remove('nav-open');
        ham.classList.remove('ham-active');
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // Dark mode
  var tt = document.getElementById('theme-toggle');
  if (tt) tt.addEventListener('click', toggleDarkMode);

  // Map layer buttons
  document.querySelectorAll('.map-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.map-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      showMapLayer(btn.dataset.layer);
    });
  });

  // Chart selector
  var cs = document.getElementById('chart-selector');
  if (cs) cs.addEventListener('change', function(e) { updateMainChart(e.target.value); });

  // Sensor type filter
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      document.querySelectorAll('.sensor-card').forEach(function(c) {
        c.style.display = (f==='all' || c.dataset.type===f) ? '' : 'none';
      });
    });
  });

  // Contact form
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      showToast("✅ Message sent! We'll be in touch within 24 hours.", 'success', 5000);
      form.reset();
    });
  }
}

// ── Dark Mode ─────────────────────────────────────────────────────────────────

var darkMode = false;
function toggleDarkMode() {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  var icon = document.querySelector('#theme-toggle i');
  if (icon) icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('biorevive-theme', darkMode ? 'dark' : 'light');
}
function applySavedTheme() {
  if (localStorage.getItem('biorevive-theme') === 'dark') {
    darkMode = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    var icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = 'fas fa-sun';
  }
}
