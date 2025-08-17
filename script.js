const weatherData = {
  "arni":  { temp: 32, rain: 70, sun: 30, note: "High chance of rain — carry umbrella." },
  "tiruvannamalai": { temp: 30, rain: 40, sun: 60, note: "Mostly sunny intervals today." },
  "polur": { temp: 31, rain: 25, sun: 75, note: "Clear skies — good day outside." },
  "kalambur": { temp: 29, rain: 55, sun: 45, note: "Light showers possible." },
  "chepet": { temp: 28, rain: 65, sun: 35, note: "Rain likely — stay indoors if possible." },
  "vandavasi": { temp: 27, rain: 35, sun: 65, note: "Mostly sunny with some clouds." }
};

const navBtns = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');
const cityBtns = document.querySelectorAll('.city-btn');
const showBtn = document.getElementById('showBtn');
const citySelect = document.getElementById('citySelect');
const typeSelect = document.getElementById('typeSelect');

const wcCity = document.getElementById('wcCity');
const wcIcon = document.getElementById('wcIcon');
const wcTemp = document.getElementById('wcTemp');
const wcCond = document.getElementById('wcCond');
const rainFill = document.getElementById('rainFill');
const sunFill = document.getElementById('sunFill');
const rainPct = document.getElementById('rainPct');
const sunPct = document.getElementById('sunPct');
const wcNote = document.getElementById('wcNote');
const raindrops = document.getElementById('raindrops');

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tgt = btn.dataset.target;
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(tgt).classList.add('active');
    window.scrollTo({ top:0, behavior:'smooth' });
  });
});

cityBtns.forEach(b=>{
  b.addEventListener('click', ()=> {
    const key = b.dataset.city;
    citySelect.value = key;
    updateFromForm();
  });
});

showBtn.addEventListener('click', updateFromForm);

citySelect.addEventListener('keydown', (e)=> { if (e.key==='Enter') updateFromForm(); });

function updateFromForm(){
  const key = (citySelect.value || '').toLowerCase();
  const type = (typeSelect.value || 'auto'); // 'auto' | 'sun' | 'rain'
  if (!weatherData[key]) {
    alert('City not supported. Use the provided cities only.');
    return;
  }
  const d = weatherData[key];

  let mode = 'sun'; // 'sun' or 'rain'
  if (type === 'auto') mode = (d.rain > d.sun) ? 'rain' : 'sun';
  else mode = (type === 'rain') ? 'rain' : 'sun';

  renderCity(key, d, mode);
}

function renderCity(key, d, mode){
  wcCity.innerText = capitalize(key);
  wcTemp.innerText = `${d.temp} °C`;
  rainPct.innerText = `${d.rain}%`;
  sunPct.innerText = `${d.sun}%`;
  wcNote.innerText = d.note;
  wcCond.innerText = (mode === 'rain') ? 'Rain likely' : 'Mostly Sunny';
  wcIcon.innerText = (mode === 'rain') ? '🌧️' : '🌞';

  setFill(rainFill, d.rain);
  setFill(sunFill, d.sun);

  if (mode === 'rain') enableRainTheme();
  else enableSunTheme();

  document.getElementById('weather').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setFill(el, val){ el.style.width = val + '%'; }

function enableRainTheme(){
  document.body.classList.remove('theme-sun');
  document.body.classList.add('theme-rain');
  createRaindrops();
}

function enableSunTheme(){
  document.body.classList.remove('theme-rain');
  document.body.classList.add('theme-sun');
  clearRaindrops();
}

let raindropInterval = null;
function createRaindrops(){
  clearRaindrops();
  const N = 36;
  for (let i=0;i<N;i++){
    const d = document.createElement('div');
    d.className = 'drop';
    const left = Math.random()*100;
    const delay = Math.random()*2;
    const dur = 0.9 + Math.random()*1.6;
    d.style.left = left + '%';
    d.style.animationDelay = delay + 's';
    d.style.animationDuration = dur + 's';
    d.style.height = (8 + Math.random()*18) + 'px';
    raindrops.appendChild(d);
  }
}
function clearRaindrops(){
  raindrops.innerHTML = '';
}

function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

window.addEventListener('DOMContentLoaded', ()=> {
  citySelect.value = 'arni';
  updateFromForm();
});
