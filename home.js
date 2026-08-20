document.addEventListener('DOMContentLoaded', () => {

  // ===== COUNT-UP WITH GROW + POP-SPIN =====
  function countUp(element, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      element.textContent = Math.floor(progress * target);
      const scaleDuring = 0.7 + progress * 0.3;
      element.style.transform = `scale(${scaleDuring}) rotate(0deg)`;

      if (progress < 1) requestAnimationFrame(update);
      else {
        element.textContent = target;
        triggerPopSpin(element);
      }
    }

    requestAnimationFrame(update);
  }

  function triggerPopSpin(element) {
    const popScale = 1.4, duration = 600, spinAmplitude = 20, damping = 0.8;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const scale = popScale - (popScale - 1) * Math.pow(t, 2);
      const angle = Math.sin(t * Math.PI * 4) * spinAmplitude * (1 - t) * damping;

      element.style.transform = `scale(${scale}) rotate(${angle}deg)`;
      if (t < 1) requestAnimationFrame(animate);
      else element.style.transform = 'scale(1) rotate(0deg)';
    }

    requestAnimationFrame(animate);
  }

  const animatedSections = document.querySelectorAll(
    "section, .card, .mission-section, .competition-section, .competition-text, .competition-image, .stats, .hero-left, .hero-right, .sponsor-logo img"
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger count-up for stats if intersecting
        if (entry.target.closest('.stats')) {
          entry.target.querySelectorAll('h3[data-target]').forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!isNaN(target)) countUp(counter, target);
          });
        }

        obs.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.25 });

  animatedSections.forEach(el => observer.observe(el));

  // ===== HERO PARTICLES + PARALLAX =====
  const canvas = document.getElementById('heroParticles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let scrollOffset = 0;

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = document.querySelector('.hero').offsetHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.y += scrollOffset * 0.02;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles(count = 80) {
      particlesArray = [];
      for (let i = 0; i < count; i++) particlesArray.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }

    initCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => { initCanvas(); initParticles(); });
    window.addEventListener('scroll', () => { scrollOffset = window.pageYOffset; });
  }

  // ===== HERO BACKGROUND PARALLAX =====
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero-bg');

  window.addEventListener('scroll', () => {
    if (hero && heroBg) {
      const scrollTop = window.pageYOffset;
      const offsetTop = hero.offsetTop;
      const speed = 0.3;
      const yPos = (scrollTop - offsetTop) * speed;
      heroBg.style.transform = `translateY(${yPos}px)`;
    }
  });

  // ===== SMOOTH SCROLL FOR NAV ANCHORS =====
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.classList.add('visible'); // ensure target is visible
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});