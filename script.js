(function() {
  const canvas = document.getElementById('petalCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, petals = [];

  const COLORS = [
    'rgba(232,160,180,alpha)',
    'rgba(255,200,210,alpha)',
    'rgba(240,220,180,alpha)',
    'rgba(255,235,235,alpha)',
    'rgba(248,210,220,alpha)',
  ];

  const rand = (a, b) => Math.random() * (b - a) + a;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makePetal() {
    return {
      x: rand(0, W), y: rand(-60, -10),
      size: rand(5, 14), rot: rand(0, Math.PI * 2),
      rotV: rand(-0.02, 0.02), vx: rand(-0.6, 0.6),
      vy: rand(0.5, 1.8), alpha: rand(0.25, 0.65),
      color: COLORS[Math.floor(rand(0, COLORS.length))],
      sway: rand(0.3, 1.2), swayT: rand(0, Math.PI * 2),
    };
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color.replace('alpha', p.alpha);
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  resize();
  petals = Array.from({ length: 28 }, () => { const p = makePetal(); p.y = rand(0, H); return p; });

  (function tick() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.swayT += 0.012;
      p.x += p.vx + Math.sin(p.swayT * p.sway) * 0.4;
      p.y += p.vy;
      p.rot += p.rotV;
      drawPetal(p);
      if (p.y > H + 20) petals[i] = makePetal();
    });
    requestAnimationFrame(tick);
  })();

  window.addEventListener('resize', resize);
})();


(function() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });

  document.querySelectorAll('#hero .reveal').forEach(el => setTimeout(() => el.classList.add('visible'), 250));
  els.forEach(el => { if (!el.closest('#hero')) io.observe(el); });
})();


(function() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });
})();


(function() {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();


(function() {
  const wm = document.querySelector('.hero-watermark');
  if (!wm) return;
  window.addEventListener('scroll', () => {
    wm.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }, { passive: true });
})();


(function() {
  const COLORS = ['#e8a0b4', '#d4aa50', '#f0c8d8', '#b8962e'];
  document.addEventListener('mousemove', e => {
    if (Math.random() > 0.25) return;
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:7px;height:7px;pointer-events:none;z-index:9999;transform:translate(-50%,-50%) rotate(45deg);background:${COLORS[Math.floor(Math.random()*COLORS.length)]};opacity:0.7;border-radius:1px;transition:transform 0.55s ease,opacity 0.55s ease;`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(-50%,-${18 + Math.random() * 22}px) rotate(${Math.random() * 180}deg) scale(0)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 600);
  });
})();