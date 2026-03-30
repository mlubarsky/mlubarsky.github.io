// Liquid Glass card tilt — covers .qs-card, .project-card, .featured-card
// Lerp + rAF loop per card for fluid, inertial motion
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var LERP = 0.09; // interpolation factor — lower = more inertia

  // Per-type configuration
  var configs = [
    { selector: '.qs-card',       maxTilt: 14, maxLift: 14, maxScale: 1.045 },
    { selector: '.project-card',  maxTilt: 10, maxLift: 10, maxScale: 1.035 },
    { selector: '.featured-card', maxTilt:  6, maxLift:  8, maxScale: 1.020 },
  ];

  function lerp(a, b, t) { return a + (b - a) * t; }
  function settled(a, b, e) { return Math.abs(a - b) < e; }

  configs.forEach(function (cfg) {
    document.querySelectorAll(cfg.selector).forEach(function (card) {
      var tRX = 0, tRY = 0, tLift = 0, tScale = 1, tMX = 50, tMY = 50;
      var cRX = 0, cRY = 0, cLift = 0, cScale = 1, cMX = 50, cMY = 50;
      var rafId = null;

      function tick() {
        cRX    = lerp(cRX,    tRX,    LERP);
        cRY    = lerp(cRY,    tRY,    LERP);
        cLift  = lerp(cLift,  tLift,  LERP);
        cScale = lerp(cScale, tScale, LERP);
        cMX    = lerp(cMX,    tMX,    LERP);
        cMY    = lerp(cMY,    tMY,    LERP);

        card.style.transform =
          'perspective(700px) ' +
          'rotateX(' + cRX.toFixed(3)    + 'deg) ' +
          'rotateY(' + cRY.toFixed(3)    + 'deg) ' +
          'translateZ(' + cLift.toFixed(2) + 'px) ' +
          'scale(' + cScale.toFixed(4)   + ')';

        card.style.setProperty('--mouse-x', cMX.toFixed(2) + '%');
        card.style.setProperty('--mouse-y', cMY.toFixed(2) + '%');

        var done =
          settled(cRX,    tRX,    0.005)  &&
          settled(cRY,    tRY,    0.005)  &&
          settled(cLift,  tLift,  0.05)   &&
          settled(cScale, tScale, 0.0005) &&
          settled(cMX,    tMX,    0.05)   &&
          settled(cMY,    tMY,    0.05);

        rafId = done ? null : requestAnimationFrame(tick);
      }

      function start() {
        if (!rafId) rafId = requestAnimationFrame(tick);
      }

      card.addEventListener('mouseenter', function () {
        tLift  = cfg.maxLift;
        tScale = cfg.maxScale;
        start();
      });

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var dx = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)));
        var dy = Math.max(-1, Math.min(1, (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)));
        tRY = dx * cfg.maxTilt;
        tRX = -dy * cfg.maxTilt;
        tMX = ((dx + 1) / 2) * 100;
        tMY = ((dy + 1) / 2) * 100;
        start();
      });

      card.addEventListener('mouseleave', function () {
        tRX = 0; tRY = 0;
        tLift = 0; tScale = 1;
        tMX = 50; tMY = 50;
        start();
      });
    });
  });
})();
