

(function () {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });

  document.querySelectorAll('#hero .reveal').forEach(el => setTimeout(() => el.classList.add('visible'), 250));
  els.forEach(el => { if (!el.closest('#hero')) io.observe(el); });
})();


(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });
})();


(function () {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
})();


(function () {
  const wm = document.querySelector('.hero-watermark');
  if (!wm) return;
  window.addEventListener('scroll', () => {
    wm.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.15}px))`;
  }, { passive: true });
})();


(function () {
  const COLORS = ['#e8a0b4', '#d4aa50', '#f0c8d8', '#b8962e'];
  document.addEventListener('mousemove', e => {
    if (Math.random() > 0.25) return;
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:7px;height:7px;pointer-events:none;z-index:9999;transform:translate(-50%,-50%) rotate(45deg);background:${COLORS[Math.floor(Math.random() * COLORS.length)]};opacity:0.7;border-radius:1px;transition:transform 0.55s ease,opacity 0.55s ease;`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(-50%,-${18 + Math.random() * 22}px) rotate(${Math.random() * 180}deg) scale(0)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 600);
  });
})();

const music = document.getElementById("music");

document.addEventListener("click", () => {
    music.muted = false;
    music.volume = 0.8;
    music.play();
}, { once: true });

/*in_the_shadows08 was here*/