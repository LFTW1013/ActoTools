const themeSelect = document.getElementById('theme');

themeSelect.addEventListener('change', (e) => {
  document.body.className = 'theme-' + e.target.value;
  localStorage.setItem('theme', e.target.value); // save theme
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

// Placeholder CPU/RAM (hook real stats via Electron later)
const cpuWidget = document.getElementById('cpu-widget');
const ramWidget = document.getElementById('ram-widget');

function updateStats() {
  cpuWidget.textContent = `CPU: ${Math.floor(Math.random()*100)}%`;
  ramWidget.textContent = `RAM: ${Math.floor(Math.random()*100)}%`;
}
setInterval(updateStats, 2000);
updateStats();
