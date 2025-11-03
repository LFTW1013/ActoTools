const si = require('systeminformation');

const themeSelect = document.getElementById('theme');
themeSelect.addEventListener('change', e => {
  document.body.className = 'theme-' + e.target.value;
  localStorage.setItem('theme', e.target.value);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'normal';
themeSelect.value = savedTheme;
document.body.className = 'theme-' + savedTheme;

// Time widget
const timeWidget = document.getElementById('time-widget');
function updateTime() {
  const now = new Date();
  timeWidget.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Stats widgets
const cpuWidget = document.getElementById('cpu-widget');
const ramWidget = document.getElementById('ram-widget');
const diskWidget = document.getElementById('disk-widget');

async function updateStats() {
  const cpuLoad = await si.currentLoad();
  const mem = await si.mem();
  const disk = await si.fsSize();

  cpuWidget.textContent = `CPU: ${cpuLoad.currentLoad.toFixed(1)}%`;
  ramWidget.textContent = `RAM: ${((mem.active / mem.total)*100).toFixed(1)}%`;
  diskWidget.textContent = `Disk: ${disk[0].use.toFixed(1)}%`;
}

setInterval(updateStats, 2000);
updateStats();
