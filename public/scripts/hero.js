// Hero section: drifting spotlight orbs (school of fish) + cursor repulsion (shark)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var section = document.querySelector('.hero');
  if (!section) return;

  // Create canvas overlay
  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  section.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;

  // Each orb: home anchor (fractional), current pos, velocity, drift params
  var orbDefs = [
    { hx: 0.12, hy: 0.25 },
    { hx: 0.38, hy: 0.55 },
    { hx: 0.55, hy: 0.18 },
    { hx: 0.72, hy: 0.65 },
    { hx: 0.88, hy: 0.30 },
    { hx: 0.22, hy: 0.78 },
    { hx: 0.62, hy: 0.82 },
  ];

  var orbs = orbDefs.map(function (def, i) {
    return {
      hx:      def.hx,
      hy:      def.hy,
      x:       0,
      y:       0,
      vx:      (Math.random() - 0.5) * 0.5,
      vy:      (Math.random() - 0.5) * 0.5,
      radius:  155 + Math.random() * 95,
      phase:   (i / orbDefs.length) * Math.PI * 2 + Math.random() * 1.5,
      freq:    0.00022 + Math.random() * 0.00016,
      amp:     50 + Math.random() * 40,
    };
  });

  var mouseX  = -9999;
  var mouseY  = -9999;
  var hovering = false;
  var t = 0;
  var animId;

  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
    // Seed initial positions on first resize
    orbs.forEach(function (o) {
      if (o.x === 0 && o.y === 0) {
        o.x = o.hx * W + (Math.random() - 0.5) * 80;
        o.y = o.hy * H + (Math.random() - 0.5) * 80;
      }
    });
  }

  section.addEventListener('mousemove', function (e) {
    var rect = section.getBoundingClientRect();
    mouseX   = e.clientX - rect.left;
    mouseY   = e.clientY - rect.top;
    hovering = true;
  });

  section.addEventListener('mouseleave', function () {
    hovering = false;
    mouseX   = -9999;
    mouseY   = -9999;
  });

  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    var alphaCore = isLight() ? 0.07 : 0.18;

    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];

      // Slow sinusoidal drift target around home anchor
      var tx = o.hx * W + Math.sin(t * o.freq + o.phase) * o.amp;
      var ty = o.hy * H + Math.cos(t * o.freq * 1.35 + o.phase) * o.amp * 0.6;

      // Soft spring toward drift target
      o.vx += (tx - o.x) * 0.0035;
      o.vy += (ty - o.y) * 0.0035;

      // Cursor repulsion — the "shark swimming through the school"
      if (hovering) {
        var dx   = o.x - mouseX;
        var dy   = o.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var R    = 250;
        if (dist < R && dist > 1) {
          // Quadratic falloff: strongest right at cursor, fades to edge
          var t2      = 1 - dist / R;
          var strength = t2 * t2 * 8;
          o.vx += (dx / dist) * strength;
          o.vy += (dy / dist) * strength;
        }
      }

      // Damping
      o.vx *= 0.89;
      o.vy *= 0.89;

      o.x += o.vx;
      o.y += o.vy;

      // Draw radial gradient
      var r = o.radius;
      var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
      g.addColorStop(0,    'rgba(124, 111, 247, ' + alphaCore + ')');
      g.addColorStop(0.35, 'rgba(124, 111, 247, ' + (alphaCore * 0.45) + ')');
      g.addColorStop(1,    'rgba(124, 111, 247, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();
