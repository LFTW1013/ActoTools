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