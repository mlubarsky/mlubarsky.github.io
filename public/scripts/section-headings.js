// Scramble-decode effect for eyebrow labels marked with [data-scramble]
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var CHARS = '!<>-_/\\[]{}=+*^?#abcdefghijklmnopqrstuvwxyz0123456789';
  var DURATION = 1400; // ms total for the decode to complete

  function scramble(el) {
    // Store the real text once
    if (!el.dataset.final) {
      el.dataset.final = el.textContent;
    }
    var final = el.dataset.final;
    var start = performance.now();

    function frame(now) {
      var progress = Math.min((now - start) / DURATION, 1);
      var output = '';

      for (var i = 0; i < final.length; i++) {
        var ch = final[i];
        // Keep spaces as spaces so word boundaries stay readable
        if (ch === ' ') {
          output += ch;
        } else if (progress > i / final.length) {
          // This character has been "decoded" — lock it in
          output += ch;
        } else {
          // Still scrambling — pick a random char
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      el.textContent = output;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = final;
      }
    }

    requestAnimationFrame(frame);
  }

  // Observe each [data-scramble] element — re-fire every time it enters the viewport
  var elements = document.querySelectorAll('[data-scramble]');
  if (!elements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        scramble(entry.target);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
