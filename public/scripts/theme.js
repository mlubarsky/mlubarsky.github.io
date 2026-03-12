// Theme toggle — runs after DOM is ready
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (iconSun && iconMoon) {
      iconSun.style.display  = theme === 'light' ? 'block' : 'none';
      iconMoon.style.display = theme === 'light' ? 'none'  : 'block';
    }
  }

  if (btn) {
    btn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // Apply saved theme on load (also done inline in <head> to prevent flash)
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
})();
