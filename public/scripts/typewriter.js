// Typewriter effect with reduced-motion support
(function () {
  var container = document.getElementById('typed-text');
  var cursor    = document.getElementById('typed-cursor');
  if (!container) return;

  var text  = "Hi, I'm Maxwell Lubarsky";
  var speed = 70; // ms per character

  // Respect prefers-reduced-motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    container.textContent = text;
    if (cursor) cursor.style.display = 'none';
    return;
  }

  var index = 0;
  function type() {
    if (index < text.length) {
      container.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      // Blink cursor a few times then hide it
      if (cursor) {
        cursor.classList.add('done');
      }
    }
  }

  type();
})();
