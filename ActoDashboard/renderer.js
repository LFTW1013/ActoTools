const si = require('systeminformation');

// Elements
const themeSelect = document.getElementById('theme');
const widgets = {
  time: document.getElementById('time-widget'),
  cpu: document.getElementById('cpu-widget'),
  ram: document.getElementById('ram-widget'),
  disk: document.getElementById('disk-widget')
};

// ---- Theme handling ----
const savedTheme = localStorage.getItem('theme') || 'normal';
themeSelect.value = savedTheme;
document.body.className = 'theme-' + savedTheme;

themeSelect.addEventListener('change', e => {
  document.body.className = 'theme-' + e.target.value;
  localStorage.setItem('theme', e.target.value);
});

// ---- Time widget ----
function updateTime() {
  const now = new Date();
  widgets.time.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// ---- System stats ----
async function updateStats() {
  try {
    const [cpuLoad, mem, disk] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize()
    ]);

    widgets.cpu.textContent = `CPU: ${cpuLoad.currentLoad.toFixed(1)}%`;
    widgets.ram.textContent = `RAM: ${((mem.active / mem.total) * 100).toFixed(1)}%`;
    widgets.disk.textContent = `Disk: ${disk[0].use.toFixed(1)}%`;
  } catch (err) {
    console.error('Error fetching system stats:', err);
  }
}

setInterval(updateStats, 2000);
updateStats();
