// map.js — Leaflet interactive map

var bioMap, sensorMarkers = [], zoneCircles = [], speciesMarkers = [];

function initMap() {
  bioMap = L.map('map', { center:[56.0722,-3.4546], zoom:13, zoomControl:true });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom:19
  }).addTo(bioMap);

  addMapZones();
  addMapSensors();
  addMapSpecies();
  showMapLayer('sensors');
}

function addMapZones() {
  BioData.zones.forEach(function(zone) {
    var circle = L.circle([zone.lat, zone.lng], {
      radius: zone.radius,
      color: zone.color,
      fillColor: zone.color,
      fillOpacity: 0.15,
      weight: 2,
      dashArray: '6,4'
    }).addTo(bioMap);

    circle.bindPopup(
      '<div class="mpop"><h4>' + zone.name + '</h4>' +
      '<p><b>Status:</b> ' + zone.status + '</p>' +
      '<p><b>Trees planted:</b> ' + zone.plantedTrees + '</p>' +
      '<p><b>Radius:</b> ' + zone.radius + ' m</p></div>'
    );
    zoneCircles.push(circle);
  });
}

function addMapSensors() {
  BioData.sensors.forEach(function(sensor) {
    var colorMap = { active:'#1D9E75', warning:'#F39C12', inactive:'#636e72' };
    var color = colorMap[sensor.status] || colorMap.active;
    var icon = L.divIcon({
      className: '',
      html: '<div class="smark" style="background:' + color + '" title="' + sensor.name + '">' +
            '<i class="fas ' + getSensorIcon(sensor.type) + '"></i>' +
            (sensor.status === 'active' ? '<div class="spulse" style="border-color:' + color + '"></div>' : '') +
            '</div>',
      iconSize:[34,34], iconAnchor:[17,17]
    });

    var r = generateReadings();
    var marker = L.marker([sensor.lat, sensor.lng], { icon:icon }).addTo(bioMap);
    marker.bindPopup(
      '<div class="mpop">' +
      '<div class="mpop-head"><h4>' + sensor.name + '</h4>' +
      '<span class="mbadge" style="background:' + color + '">' + getStatusLabel(sensor.status) + '</span></div>' +
      '<div class="mpop-id">' + sensor.id + ' &nbsp;|&nbsp; ' + sensor.type + '</div>' +
      '<div class="mpop-grid">' +
      '<div class="mpop-cell"><i class="fas fa-thermometer-half"></i> ' + r.temp + '°C</div>' +
      '<div class="mpop-cell"><i class="fas fa-tint"></i> ' + r.humidity + '%</div>' +
      '<div class="mpop-cell"><i class="fas fa-volume-up"></i> ' + r.sound + ' dB</div>' +
      '<div class="mpop-cell"><i class="fas fa-wind"></i> ' + r.aqi + ' AQI</div>' +
      '</div>' +
      '<div class="mpop-time">Updated ' + randomBetween(1,59) + ' min ago</div>' +
      '</div>'
    );
    sensorMarkers.push(marker);
  });
}

function addMapSpecies() {
  var locs = [
    { spId:'SP001', lat:56.0731, lng:-3.4510 },
    { spId:'SP002', lat:56.0710, lng:-3.4560 },
    { spId:'SP003', lat:56.0695, lng:-3.4578 },
    { spId:'SP004', lat:56.0740, lng:-3.4530 },
    { spId:'SP005', lat:56.0867, lng:-3.4320 },
    { spId:'SP006', lat:56.0660, lng:-3.4410 },
  ];

  locs.forEach(function(loc) {
    var sp = BioData.species.find(function(s){ return s.id === loc.spId; });
    if (!sp) return;
    var icon = L.divIcon({
      className: '',
      html: '<div class="spmark" style="border-color:' + sp.statusColor + '">' + sp.emoji + '</div>',
      iconSize:[34,34], iconAnchor:[17,17]
    });
    var m = L.marker([loc.lat, loc.lng], { icon:icon }).addTo(bioMap);
    m.bindPopup(
      '<div class="mpop"><h4>' + sp.emoji + ' ' + sp.name + '</h4>' +
      '<em style="color:#636e72">' + sp.latin + '</em>' +
      '<p style="margin-top:8px"><b>Status:</b> <span style="color:' + sp.statusColor + '">' + sp.status + '</span></p>' +
      '<p><b>Population:</b> ' + sp.population + ' &nbsp; <b>Trend:</b> <span style="color:#1D9E75">+' + sp.trend + '%</span></p>' +
      '<p><b>Last seen:</b> ' + sp.lastSeen + '</p></div>'
    );
    speciesMarkers.push(m);
  });
}

function showMapLayer(layerName) {
  sensorMarkers.forEach(function(m) {
    if (layerName === 'sensors') { bioMap.addLayer(m); } else { bioMap.removeLayer(m); }
  });
  zoneCircles.forEach(function(c) {
    if (layerName === 'zones') { bioMap.addLayer(c); } else { bioMap.removeLayer(c); }
  });
  speciesMarkers.forEach(function(m) {
    if (layerName === 'species') { bioMap.addLayer(m); } else { bioMap.removeLayer(m); }
  });
}
