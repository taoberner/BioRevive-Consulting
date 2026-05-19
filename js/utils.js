// utils.js — shared helpers

function showToast(message, type, duration) {
  type = type || 'info';
  duration = duration || 4000;
  var container = document.getElementById('toast-container');
  if (!container) return;
  var icons = { info:'fa-info-circle', success:'fa-check-circle', warning:'fa-exclamation-triangle', error:'fa-times-circle' };
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i><span>' + message + '</span><button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>';
  container.appendChild(toast);
  requestAnimationFrame(function() { toast.classList.add('toast-visible'); });
  setTimeout(function() {
    toast.classList.remove('toast-visible');
    setTimeout(function() { if (toast.parentElement) toast.remove(); }, 350);
  }, duration);
}

function randomBetween(min, max, decimals) {
  var v = min + Math.random() * (max - min);
  return decimals ? parseFloat(v.toFixed(decimals)) : Math.round(v);
}

function debounce(fn, delay) {
  var timer;
  return function() {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() { fn.apply(this, args); }, delay);
  };
}

function throttle(fn, limit) {
  var inThrottle = false;
  return function() {
    if (!inThrottle) {
      fn.apply(this, arguments);
      inThrottle = true;
      setTimeout(function() { inThrottle = false; }, limit);
    }
  };
}

function getStatusLabel(status) {
  var map = { active:'Online', warning:'Warning', inactive:'Offline', recovering:'Recovering', stable:'Stable', critical:'Critical', endangered:'Endangered', protected:'Protected', monitoring:'Monitoring' };
  return map[status] || status;
}

function getSensorIcon(type) {
  var icons = { multimodal:'fa-satellite-dish', temperature:'fa-thermometer-half', humidity:'fa-tint', sound:'fa-volume-up', camera:'fa-camera', soil:'fa-seedling' };
  return icons[type] || 'fa-circle';
}

function generateReadings() {
  return { temp:randomBetween(18,26,1), humidity:randomBetween(65,85), sound:randomBetween(40,60), aqi:randomBetween(25,55) };
}
