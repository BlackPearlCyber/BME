const bedEl = document.getElementById('bed');
const hrEl = document.getElementById('hr');
const spEl = document.getElementById('sp');
const tempEl = document.getElementById('temp');
const lastUpdateEl = document.getElementById('lastUpdate');
const alertsSentEl = document.getElementById('alertsSent');
const connEl = document.getElementById('conn');
const logEl = document.getElementById('log');

const serialInput = document.getElementById('serialInput');
const sendBtn = document.getElementById('sendBtn');
const randomBtn = document.getElementById('randomBtn');
const sosBtn = document.getElementById('sosBtn');
const fallBtn = document.getElementById('fallBtn');

let alertsSent = 0;

// Chart.js setup
const ctx = document.getElementById('hrChart').getContext('2d');
const maxPoints = 40;
const chartData = {
  labels: Array.from({length:maxPoints}).map(()=>''),
  datasets: [
    {label:'Heart Rate', data:Array(maxPoints).fill(null), borderColor:'#ff6384', backgroundColor:'rgba(255,99,132,0.08)', tension:0.25},
    {label:'SpO2', data:Array(maxPoints).fill(null), borderColor:'#36a2eb', backgroundColor:'rgba(54,162,235,0.06)', tension:0.25}
  ]
};

const hrChart = new Chart(ctx, {
  type: 'line',
  data: chartData,
  options: {
    responsive:true, maintainAspectRatio:false,
    scales:{y:{beginAtZero:false,ticks:{color:'#cfd8e3'}},x:{ticks:{color:'#7f97ab'}}},
    plugins:{legend:{labels:{color:'#cfd8e3'}}}
  }
});

function pushChart(hr, sp) {
  chartData.labels.push(new Date().toLocaleTimeString());
  chartData.labels.shift();
  chartData.datasets[0].data.push(Number(hr)||null);
  chartData.datasets[0].data.shift();
  chartData.datasets[1].data.push(Number(sp)||null);
  chartData.datasets[1].data.shift();
  hrChart.update();
}

function parseSerial(data) {
  data = (data||'').trim();
  appendLog('RX: ' + data);
  const parts = data.split(',');
  if (parts.length >= 2) {
    const hr = parts[0];
    const sp = parts[1];
    hrEl.textContent = hr;
    spEl.textContent = sp;
    statusOk();
    pushChart(hr, sp);
    tempEl.textContent = generateTemp();
    lastUpdateEl.textContent = new Date().toLocaleTimeString();
  }
}

function appendLog(s){
  const el = document.createElement('div');
  el.textContent = new Date().toLocaleTimeString() + ' — ' + s;
  logEl.prepend(el);
}

function statusOk(){
  connEl.textContent = 'Local Demo';
}

function generateTemp(){
  return (36 + Math.random()*1.4).toFixed(1);
}

sendBtn.addEventListener('click', ()=>{
  const v = serialInput.value || '';
  parseSerial(v);
});

randomBtn.addEventListener('click', ()=>{
  const r1 = Math.floor(60 + Math.random()*40);
  const r2 = Math.floor(94 + Math.random()*6);
  parseSerial(r1 + ',' + r2);
});

sosBtn.addEventListener('click', ()=>{
  appendLog('SOS triggered — Telegram alert simulated');
  alertsSent++;
  alertsSentEl.textContent = alertsSent;
});

fallBtn.addEventListener('click', ()=>{
  appendLog('Fall detected — Telegram alert simulated');
  alertsSent++;
  alertsSentEl.textContent = alertsSent;
});

// Seed chart with empty values and update clock
setInterval(()=>{
  lastUpdateEl.textContent = lastUpdateEl.textContent || '—';
},1000);

// Initialize with a few demo readings
for(let i=0;i<6;i++){ randomBtn.click(); }
