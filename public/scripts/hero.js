// Hero background — slowly drifting colour blobs with mouse-repulsion ("shark through fish")
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var section = document.querySelector('.hero');
  if (!section) return;

  // ── Canvas setup ─────────────────────────────────────────────────────────────
  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  // Heavy CSS blur turns sharp gradient circles into fluid aurora blobs
  canvas.style.cssText =
    'position:absolute;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:0;' +
    'filter:blur(90px) saturate(1.5);';
  section.prepend(canvas);

  var ctx = canvas.getContext('2d');
  var W = 0, H = 0;

  // ── Orb definitions ───────────────────────────────────────────────────────────
  // hx/hy  : fractional home anchor
  // color  : [R, G, B]
  // r      : blob radius (px, before blur spreads it)
  // ax/ay  : drift amplitude (px) per axis
  // fx/fy  : drift frequency (radians/frame) — very small = very slow
  // px/py  : per-axis phase offset so no two blobs move in sync
  var ORB_DEFS = [
    // ── Purple family (dominant) ──────────────────────────────────
    { hx: 0.08, hy: 0.18, color: [124, 111, 247], r: 290, ax: 60, ay: 40, fx: 0.00018, fy: 0.00024, px: 0.00, py: 0.90 },
    { hx: 0.42, hy: 0.60, color: [140,  96, 255], r: 250, ax: 50, ay: 65, fx: 0.00022, fy: 0.00016, px: 1.80, py: 2.70 },
    { hx: 0.58, hy: 0.12, color: [108,  92, 240], r: 300, ax: 75, ay: 45, fx: 0.00015, fy: 0.00027, px: 3.60, py: 1.20 },
    { hx: 0.78, hy: 0.72, color: [132, 102, 255], r: 220, ax: 45, ay: 58, fx: 0.00026, fy: 0.00019, px: 5.10, py: 4.00 },
    { hx: 0.91, hy: 0.32, color: [118, 106, 243], r: 260, ax: 65, ay: 48, fx: 0.00019, fy: 0.00023, px: 2.30, py: 0.50 },
    // ── Indigo shift ──────────────────────────────────────────────
    { hx: 0.24, hy: 0.82, color: [ 99,  80, 218], r: 210, ax: 55, ay: 32, fx: 0.00024, fy: 0.00017, px: 4.20, py: 3.30 },
    // ── Green accent (subtle, 2 orbs) ─────────────────────────────
    { hx: 0.68, hy: 0.88, color: [ 74, 222, 128], r: 195, ax: 38, ay: 52, fx: 0.00014, fy: 0.00025, px: 1.10, py: 5.50 },
    { hx: 0.46, hy: 0.48, color: [ 74, 222, 128], r: 175, ax: 68, ay: 37, fx: 0.00028, fy: 0.00019, px: 6.00, py: 2.10 },
    // ── Cool blue hint ────────────────────────────────────────────
    { hx: 0.84, hy: 0.14, color: [ 96, 155, 255], r: 200, ax: 48, ay: 58, fx: 0.00021, fy: 0.00025, px: 3.00, py: 4.80 },
  ];

  var orbs = ORB_DEFS.map(function (d) {
    return {
      hx: d.hx, hy: d.hy,
      color: d.color,
      r: d.r,
      ax: d.ax, ay: d.ay,
      fx: d.fx, fy: d.fy,
      px: d.px, py: d.py,
      x: 0, y: 0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    };
  });

  // ── Mouse state ───────────────────────────────────────────────────────────────
  var mouseX = -9999, mouseY = -9999;
  var hovering = false;
  var t = 0;

  // ── Resize ────────────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
    orbs.forEach(function (o) {
      if (o.x === 0 && o.y === 0) {
        o.x = o.hx * W + (Math.random() - 0.5) * 60;
        o.y = o.hy * H + (Math.random() - 0.5) * 60;
      }
    });
  }

  // ── Mouse events ──────────────────────────────────────────────────────────────
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

  // ── Helpers ───────────────────────────────────────────────────────────────────
  function isLight() {
    return document.documentElement.getAttribute('data-theme') === 'light';
  }

  // ── Draw loop ─────────────────────────────────────────────────────────────────
  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    // 'lighter' adds overlapping colours together → natural glow at intersections
    ctx.globalCompositeOperation = 'lighter';

    // Green orbs are intentionally dimmer so they accent rather than dominate
    var alphaBase  = isLight() ? 0.10 : 0.30;
    var alphaGreen = isLight() ? 0.06 : 0.14;

    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];

      // ── Independent X / Y sinusoidal drift target ─────────────────────────
      var tx = o.hx * W + Math.sin(t * o.fx + o.px) * o.ax;
      var ty = o.hy * H + Math.cos(t * o.fy + o.py) * o.ay;

      // ── Soft spring toward drift target ───────────────────────────────────
      o.vx += (tx - o.x) * 0.0038;
      o.vy += (ty - o.y) * 0.0038;

      // ── Cursor repulsion — shark swimming through the school ───────────────
      if (hovering) {
        var dx   = o.x - mouseX;
        var dy   = o.y - mouseY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var R    = 380;          // repulsion radius (px)
        if (dist < R && dist > 1) {
          var falloff  = 1 - dist / R;
          var strength = falloff * falloff * 13;  // quadratic: strong near cursor
          o.vx += (dx / dist) * strength;
          o.vy += (dy / dist) * strength;
        }
      }

      // ── Friction ──────────────────────────────────────────────────────────
      o.vx *= 0.90;
      o.vy *= 0.90;

      o.x += o.vx;
      o.y += o.vy;

      // ── Draw radial gradient blob ──────────────────────────────────────────
      var c   = o.color;
      var isGreen = (c[1] > 180);          // green orbs have high G channel
      var a0  = isGreen ? alphaGreen : alphaBase;

      var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      g.addColorStop(0,    'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a0 + ')');
      g.addColorStop(0.42, 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + (a0 * 0.38) + ')');
      g.addColorStop(1,    'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',0)');

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();
