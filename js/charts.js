// charts.js — Chart.js visualisations

var mainChart, radarChart, barChart;

var C = {
  primary:   '#1D9E75',
  secondary: '#27500A',
  accent:    '#5DCAA5',
  danger:    '#E74C3C',
  warning:   '#F39C12',
  tooltipBg: '#0d1f0d',
  tooltipTitle: '#5DCAA5',
  gridColor: 'rgba(0,0,0,0.05)',
  tickColor: '#636e72'
};

function makeTooltip() {
  return { backgroundColor:C.tooltipBg, titleColor:C.tooltipTitle, bodyColor:'#ecf0f1', padding:12, cornerRadius:8 };
}

function generateSeries(n, min, max) {
  var data = [], val = (min+max)/2;
  for (var i = 0; i < n; i++) {
    val += (Math.random()-0.5)*(max-min)*0.22;
    val = Math.max(min, Math.min(max, val));
    data.push(parseFloat(val.toFixed(1)));
  }
  return data;
}

function initCharts() {
  initMainChart();
  initRadarChart();
  initBarChart();
}

function initMainChart() {
  var ctx = document.getElementById('main-chart');
  if (!ctx) return;
  var hours = [];
  for (var i=0;i<24;i++) hours.push((i<10?'0':'')+i+':00');

  mainChart = new Chart(ctx, {
    type:'line',
    data:{
      labels: hours,
      datasets:[{
        label:'Temperature (°C)',
        data: generateSeries(24,18,26),
        borderColor: C.primary,
        backgroundColor: 'rgba(29,158,117,0.12)',
        borderWidth:2.5, fill:true, tension:0.4,
        pointBackgroundColor: C.primary, pointRadius:3, pointHoverRadius:6
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:makeTooltip() },
      scales:{
        x:{ grid:{color:C.gridColor}, ticks:{maxTicksLimit:8, color:C.tickColor, font:{size:11}} },
        y:{ grid:{color:C.gridColor}, ticks:{color:C.tickColor, font:{size:11}} }
      },
      animation:{ duration:700, easing:'easeInOutQuart' }
    }
  });
}

function initRadarChart() {
  var ctx = document.getElementById('radar-chart');
  if (!ctx) return;
  radarChart = new Chart(ctx, {
    type:'radar',
    data:{
      labels:['Biodiversity','Water Quality','Air Quality','Soil Health','Sound Ecology','Habitat Cover'],
      datasets:[
        {
          label:'2022 Baseline',
          data:[35,42,58,40,62,30],
          borderColor:'rgba(231,76,60,0.75)', backgroundColor:'rgba(231,76,60,0.1)',
          borderWidth:2, pointBackgroundColor:'rgba(231,76,60,0.75)'
        },
        {
          label:'2025 Current',
          data:[78,75,82,71,85,73],
          borderColor:C.primary, backgroundColor:'rgba(29,158,117,0.15)',
          borderWidth:2.5, pointBackgroundColor:C.primary
        }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'bottom', labels:{color:C.tickColor, padding:20, font:{size:12}} }, tooltip:makeTooltip() },
      scales:{ r:{
        beginAtZero:true, max:100,
        ticks:{ stepSize:20, color:C.tickColor, font:{size:10}, backdropColor:'transparent' },
        grid:{ color:'rgba(0,0,0,0.08)' },
        pointLabels:{ color:'#2d3436', font:{size:12} }
      }},
      animation:{ duration:1100, easing:'easeInOutQuart' }
    }
  });
}

function initBarChart() {
  var ctx = document.getElementById('bar-chart');
  if (!ctx) return;
  barChart = new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Red Squirrel','Bat Colony','Otter','Barn Owl','Curlew','Hedgehog'],
      datasets:[
        { label:'2022', data:[12,280,2,1,8,55],  backgroundColor:'rgba(231,76,60,0.7)',    borderColor:C.danger,   borderWidth:1, borderRadius:5 },
        { label:'2025', data:[47,340,8,4,15,82], backgroundColor:'rgba(29,158,117,0.82)', borderColor:C.primary,  borderWidth:1, borderRadius:5 }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{color:C.tickColor, padding:16, font:{size:12}} }, tooltip:makeTooltip() },
      scales:{
        x:{ grid:{display:false}, ticks:{color:C.tickColor, font:{size:11}} },
        y:{ grid:{color:C.gridColor}, ticks:{color:C.tickColor, font:{size:11}} }
      },
      animation:{ duration:1000, easing:'easeInOutQuart' }
    }
  });
}

function updateMainChart(metric) {
  if (!mainChart) return;
  var cfgs = {
    temperature:  { label:'Temperature (°C)',    min:18,   max:26,   bc:C.primary,   bg:'rgba(29,158,117,0.12)' },
    humidity:     { label:'Humidity (%)',         min:65,   max:85,   bc:'#3498db',   bg:'rgba(52,152,219,0.12)' },
    biodiversity: { label:'Biodiversity Index',  min:0.45, max:0.92, bc:C.secondary, bg:'rgba(39,80,10,0.12)'   }
  };
  var cfg = cfgs[metric] || cfgs.temperature;
  mainChart.data.datasets[0].label            = cfg.label;
  mainChart.data.datasets[0].data             = generateSeries(24, cfg.min, cfg.max);
  mainChart.data.datasets[0].borderColor       = cfg.bc;
  mainChart.data.datasets[0].backgroundColor   = cfg.bg;
  mainChart.data.datasets[0].pointBackgroundColor = cfg.bc;
  mainChart.update('active');
}

function makeMiniChart(canvasId, history, color) {
  var ctx = document.getElementById(canvasId);
  if (!ctx) return;
  new Chart(ctx, {
    type:'line',
    data:{
      labels: history.map(function(_,i){ return i; }),
      datasets:[{ data:history, borderColor:color, backgroundColor:color+'22', borderWidth:2, fill:true, tension:0.4, pointRadius:0 }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{enabled:false} },
      scales:{ x:{display:false}, y:{display:false} },
      animation:{ duration:600 }
    }
  });
}
