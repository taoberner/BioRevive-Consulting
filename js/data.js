// data.js — BioRevive static data and shared state

const BioData = {
  sensors: [
    { id:'S001', name:'Pittencrieff East',    type:'multimodal',  lat:56.0730, lng:-3.4470, zone:'pittencrieff', status:'active'   },
    { id:'S002', name:'Pittencrieff West',    type:'multimodal',  lat:56.0715, lng:-3.4620, zone:'pittencrieff', status:'active'   },
    { id:'S003', name:'Pittencrieff Centre',  type:'camera',      lat:56.0722, lng:-3.4546, zone:'pittencrieff', status:'active'   },
    { id:'S004', name:'Townhill North',       type:'temperature', lat:56.0887, lng:-3.4300, zone:'townhill',     status:'active'   },
    { id:'S005', name:'Townhill South',       type:'humidity',    lat:56.0840, lng:-3.4380, zone:'townhill',     status:'active'   },
    { id:'S006', name:'Duloch Park A',        type:'sound',       lat:56.0655, lng:-3.3910, zone:'duloch',       status:'active'   },
    { id:'S007', name:'Brucefield Main',      type:'multimodal',  lat:56.0605, lng:-3.4490, zone:'brucefield',   status:'warning'  },
    { id:'S008', name:'Glen Bridge Cam',      type:'camera',      lat:56.0735, lng:-3.4510, zone:'pittencrieff', status:'active'   },
    { id:'S009', name:'Knock Hill Ridge',     type:'temperature', lat:56.0550, lng:-3.4800, zone:'hills',        status:'active'   },
    { id:'S010', name:'Carnegie North',       type:'sound',       lat:56.0748, lng:-3.4395, zone:'urban',        status:'active'   },
    { id:'S011', name:'Moor Street Node',     type:'humidity',    lat:56.0680, lng:-3.4700, zone:'urban',        status:'inactive' },
    { id:'S012', name:'East Port Multi',      type:'multimodal',  lat:56.0705, lng:-3.4420, zone:'urban',        status:'active'   },
  ],

  zones: [
    { id:'Z001', name:'Pittencrieff Park',     lat:56.0722, lng:-3.4546, radius:400, color:'#1D9E75', status:'active',     plantedTrees:180 },
    { id:'Z002', name:'Townhill Country Park', lat:56.0860, lng:-3.4340, radius:350, color:'#27500A', status:'active',     plantedTrees:120 },
    { id:'Z003', name:'Duloch Park',           lat:56.0655, lng:-3.3910, radius:250, color:'#5DCAA5', status:'active',     plantedTrees:80  },
    { id:'Z004', name:'Brucefield Estate',     lat:56.0605, lng:-3.4490, radius:200, color:'#F39C12', status:'monitoring', plantedTrees:70  },
  ],

  species: [
    {
      id:'SP001', name:'Red Squirrel',        latin:'Sciurus vulgaris',           emoji:'🐿️',
      status:'recovering', statusColor:'#F39C12',
      population:47,  trend:12, sightings:23, lastSeen:'2 hours ago',
      habitat:'Woodland',
      description:'Native red squirrels making a comeback through targeted grey squirrel management and habitat restoration.',
      populationHistory:[12,18,22,28,34,40,47]
    },
    {
      id:'SP002', name:'Common Pipistrelle',  latin:'Pipistrellus pipistrellus',  emoji:'🦇',
      status:'stable',     statusColor:'#1D9E75',
      population:340, trend:8,  sightings:156, lastSeen:'30 min ago',
      habitat:'Woodland / Grassland',
      description:"Scotland's most common bat thriving in restored woodland corridors and foraging grounds.",
      populationHistory:[280,295,310,320,328,335,340]
    },
    {
      id:'SP003', name:'Eurasian Otter',      latin:'Lutra lutra',                emoji:'🦦',
      status:'recovering', statusColor:'#F39C12',
      population:8,   trend:3,  sightings:12,  lastSeen:'1 day ago',
      habitat:'Riparian / Wetland',
      description:'Otters returning to the Lyne Burn following water quality improvements and riparian restoration.',
      populationHistory:[2,3,4,5,6,7,8]
    },
    {
      id:'SP004', name:'Barn Owl',            latin:'Tyto alba',                  emoji:'🦉',
      status:'critical',   statusColor:'#E74C3C',
      population:4,   trend:1,  sightings:7,   lastSeen:'3 days ago',
      habitat:'Farmland / Grassland',
      description:'A breeding pair and juveniles confirmed at Pittencrieff. Nest boxes installed to support growth.',
      populationHistory:[1,1,2,2,3,3,4]
    },
    {
      id:'SP005', name:'Eurasian Curlew',     latin:'Numenius arquata',           emoji:'🐦',
      status:'endangered',  statusColor:'#E74C3C',
      population:15,  trend:2,  sightings:18,  lastSeen:'5 hours ago',
      habitat:'Upland / Moorland',
      description:"UK's most threatened wader. Habitat management and predator control protect this critical species.",
      populationHistory:[8,9,10,11,12,13,15]
    },
    {
      id:'SP006', name:'Hedgehog',            latin:'Erinaceus europaeus',        emoji:'🦔',
      status:'stable',     statusColor:'#1D9E75',
      population:82,  trend:5,  sightings:41,  lastSeen:'6 hours ago',
      habitat:'Urban / Suburban',
      description:'Urban wildlife corridors and garden-friendly habitats helping hedgehog populations stabilise.',
      populationHistory:[55,60,65,70,74,78,82]
    },
    {
      id:'SP007', name:'Great Crested Newt',  latin:'Triturus cristatus',         emoji:'🦎',
      status:'protected',  statusColor:'#27500A',
      population:120, trend:15, sightings:34,  lastSeen:'1 day ago',
      habitat:'Wetland / Pond',
      description:'Protected under UK law — populations thriving in created pond habitats within restoration zones.',
      populationHistory:[40,55,72,88,100,110,120]
    },
    {
      id:'SP008', name:'Lapwing',             latin:'Vanellus vanellus',          emoji:'🐦',
      status:'recovering', statusColor:'#F39C12',
      population:28,  trend:6,  sightings:45,  lastSeen:'4 hours ago',
      habitat:'Grassland / Wetland',
      description:'Grassland management and winter field flooding encouraging successful lapwing breeding.',
      populationHistory:[10,14,17,20,23,25,28]
    }
  ],

  timeline: [
    { year:2022, q:'Q1', title:'Project Launch',           type:'milestone', icon:'🚀', desc:'BioRevive Consulting established. Initial biodiversity surveys completed across 3 sites in Dunfermline.' },
    { year:2022, q:'Q3', title:'Sensor Network Phase 1',   type:'tech',      icon:'📡', desc:'First 40 IoT sensors installed across Pittencrieff Park and Townhill Country Park.' },
    { year:2022, q:'Q4', title:'Habitat Restoration P1',  type:'ecology',   icon:'🌱', desc:'180 native trees planted. Invasive species management began. Water quality improvements in Lyne Burn.' },
    { year:2023, q:'Q1', title:'First Otter Sighting',     type:'wildlife',  icon:'🦦', desc:'Trail cameras captured the first confirmed otter sighting in 15 years — a landmark project moment.' },
    { year:2023, q:'Q2', title:'Live Dashboard Launch',    type:'tech',      icon:'📊', desc:'Network grew to 80+ sensors. Real-time public dashboard launched for community access.' },
    { year:2023, q:'Q4', title:'NatureScot Partnership',   type:'milestone', icon:'🤝', desc:'Formal partnership with NatureScot established for bat and raptor monitoring programmes.' },
    { year:2024, q:'Q1', title:'Barn Owl Breeding',        type:'wildlife',  icon:'🦉', desc:'First barn owl nesting in Dunfermline in 20 years confirmed at Pittencrieff perimeter.' },
    { year:2024, q:'Q3', title:'AI Anomaly Detection',     type:'tech',      icon:'🤖', desc:'127 sensors fully operational. AI-powered anomaly detection integrated for automated wildlife alerts.' },
    { year:2025, q:'Q1', title:'Biodiversity +78%',        type:'milestone', icon:'📈', desc:'Three-year biodiversity assessment confirms 78% increase in species richness across all monitored sites.' },
    { year:2025, q:'Q2', title:'Community Rewilding Fund', type:'milestone', icon:'💷', desc:'£500,000 community fund launched in partnership with Fife Council and local businesses.' },
  ],

  readings: {
    temperature:   22.4,
    humidity:      74,
    aqi:           38,
    soundLevel:    48,
    soilPH:        7.1,
    biodiversity:  0.78
  }
};
