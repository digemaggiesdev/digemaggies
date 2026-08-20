document.addEventListener("DOMContentLoaded", () => {
  // ---------- About Hero Animation ----------
  const aboutHero = document.querySelector('.about-hero');

  if (aboutHero) {
    // Layered floating elements
    const layers = [];
    class FloatingLayer {
      constructor(element, speedX, speedY, rotateSpeed) {
        this.el = element;
        this.speedX = speedX;
        this.speedY = speedY;
        this.rotateSpeed = rotateSpeed;
        this.angle = Math.random() * 360;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * aboutHero.offsetHeight;
        this.el.style.position = 'absolute';
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.rotateSpeed;
        this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
        if (this.x > window.innerWidth) this.x = -50;
        if (this.y > aboutHero.offsetHeight) this.y = -50;
      }
    }

    document.querySelectorAll('.about-hero .floating-layer').forEach((el, i) => {
      layers.push(new FloatingLayer(el, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.2, 0.2));
    });

    function animateLayers() {
      layers.forEach(l => l.update());
      requestAnimationFrame(animateLayers);
    }
    animateLayers();

    // Scroll-linked background warp
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const offset = scrollY * 0.2;
      const heroBg = aboutHero.querySelector('.hero-bg');
      if (heroBg) {
        heroBg.style.transform = `translateY(${offset * 0.4}px) scale(1.1)`;
      }
      layers.forEach((el, i) => {
        el.el.style.transform += ` translateY(${offset * (i+1) * 0.05}px)`;
      });
    });

    // Interactive tilt + glow
    aboutHero.addEventListener('mousemove', e => {
      const rect = aboutHero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      aboutHero.style.transform = `rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
      aboutHero.style.boxShadow = `${x*30}px ${y*30}px 60px rgba(255,204,0,0.2) inset`;
    });
    aboutHero.addEventListener('mouseleave', () => {
      aboutHero.style.transform = 'rotateX(0) rotateY(0)';
      aboutHero.style.boxShadow = 'none';
    });

    // Staggered floating text reveal
    const heroText = aboutHero.querySelector('.hero-text');
    if (heroText) {
      const words = heroText.textContent.split(' ');
      heroText.innerHTML = words.map(w => `<span class="float-word">${w}</span>`).join(' ');
      document.querySelectorAll('.float-word').forEach((span, i) => {
        span.style.display = 'inline-block';
        span.style.opacity = 0;
        span.style.transform = 'translateY(20px) rotate(-5deg)';
        span.style.transition = `opacity 0.6s ease ${i*0.1}s, transform 0.6s ease ${i*0.1}s`;
      });
      setTimeout(() => {
        document.querySelectorAll('.float-word').forEach(span => {
          span.style.opacity = 1;
          span.style.transform = 'translateY(0) rotate(0deg)';
        });
      }, 300);
    }
  }

  // ---------- Leadership Animation ----------
  const leaders = Array.from(document.querySelectorAll(".leader-card"));

  const leaderObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.filter = "blur(0)";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  leaders.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.filter = "blur(6px)";
    card.style.transition =
      "opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease";
    leaderObserver.observe(card);
  });

  leaders.forEach(card => {
    card.addEventListener("mousemove", e => {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });

  // ---------- Faculty Advisor Animation ----------
  const advisorCard = document.querySelector(".advisor-card");
  if (advisorCard) {
    const advisorObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    advisorCard.style.opacity = "0";
    advisorCard.style.transform = "translateY(20px)";
    advisorObserver.observe(advisorCard);
  }

  // ---------- Sub-Teams Animation ----------
  const subTeams = Array.from(document.querySelectorAll(".sub-team-card"));
  const subTeamObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  subTeams.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
    subTeamObserver.observe(card);
  });

  // ---------- Core Values Animation ----------
  const valueCards = document.querySelectorAll(".value-card");
  const valueObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  valueCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    valueObserver.observe(card);
  });
});