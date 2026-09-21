import React, { useEffect, useRef } from 'react';
import ContactForm from '../components/ContactForm';
import { useScrollReveal } from '../hooks/useScrollReveal';

const contactInfoCards = [
  {
    icon: 'fas fa-envelope',
    title: 'General Email',
    detail: 'digem.team@gmail.com',
    link: 'mailto:digem.team@gmail.com'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    detail: 'Texas A&M University, College Station, TX 77843',
    link: 'https://www.tamu.edu'
  },
  {
    icon: 'fab fa-instagram',
    title: 'Instagram',
    detail: '@dig.em.aggies',
    link: 'https://www.instagram.com/dig.em.aggies/'
  },
  {
    icon: 'fab fa-linkedin',
    title: 'LinkedIn',
    detail: 'TAMU Dig \'Em Aggies',
    link: 'https://www.linkedin.com/company/tamu-dig-em-aggies/'
  }
];

const Contact = () => {
  const canvasRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    const initCanvas = () => {
      const heroEl = canvas.parentElement;
      if (heroEl) {
        canvas.width = heroEl.offsetWidth;
        canvas.height = heroEl.offsetHeight;
      }
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = (count = 50) => {
      particlesArray = [];
      for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    initCanvas();
    initParticles();
    animateParticles();

    const handleResize = () => {
      initCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useScrollReveal(pageRef);

  return (
    <div className="contact-page" ref={pageRef}>
      {/* Contact Hero Banner */}
      <section className="hero contact-hero-split">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/team/home2.jpg')" }}></div>
        <div className="hero-overlay"></div>
        <canvas ref={canvasRef} className="hero-canvas"></canvas>

        <div className="container hero-grid-container">
          <div className="hero-left">
            <div className="hero-status-pill">
              <span className="pulse-dot"></span>
              <span>DIG 'EM AGGIES • GET IN TOUCH</span>
            </div>
            <div className="eyebrow">Connect With Dig 'Em Aggies</div>
            <h1 className="hero-title">
              Let's Build Something <span className="highlight-gold">Underground</span> Together
            </h1>
            <p className="lead">
              Whether you are interested in joining the team, supporting our build, or partnering with Aggie engineers, we would love to connect.
            </p>

            <div className="cta">
              <a className="btn" href="#contact-form-section">
                Send Message <span aria-hidden="true">↓</span>
              </a>
              <a className="contact-email" href="mailto:digem.team@gmail.com" style={{ color: '#ffffff', borderColor: 'var(--gold-bright)' }}>
                digem.team@gmail.com <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-showcase-card floating-animation">
              <div className="showcase-badge">
                <span className="live-dot"></span> QUICK CONTACT CHANNELS
              </div>
              <div className="contact-quick-grid">
                {contactInfoCards.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-quick-item"
                  >
                    <i className={item.icon}></i>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.detail}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <svg className="hero-wave-divider" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C240,100 480,0 720,30 C960,60 1200,110 1440,50 L1440,100 L0,100 Z"></path>
        </svg>
      </section>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        <section className="card donate-cta reveal">
          <div className="donate-cta-icon">
            <i className="fas fa-hand-holding-heart"></i>
          </div>
          <div className="donate-cta-content">
            <p className="eyebrow">Support The Build</p>
            <h2>Want To Donate Instead?</h2>
            <p>Every financial gift, no matter the size, goes directly toward supporting Dig 'Em Aggies.</p>
          </div>
          <div className="donate-cta-action">
            <a
              className="btn"
              href="https://myaggieland.txamfoundation.com/tamf/give"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate Now <span aria-hidden="true">→</span>
            </a>
            <p className="donate-cta-note">
              <strong>Important:</strong>{' '}
              Please select student organization then enter "Dig 'Em Aggies" in the Gift Notes section so your gift is directed to our team.
            </p>
          </div>
        </section>
      </div>

      <div className="container" style={{ marginTop: '2rem' }} id="contact-form-section">
        <section className="card contact-section reveal">
          <div className="contact-intro">
            <p className="eyebrow">Direct Inquiry</p>
            <h1 style={{ fontSize: '2.5rem' }}>Send Us A Direct Inquiry</h1>
            <p>Fill out the form below and an executive officer will follow up with you.</p>
            <a className="contact-email" href="mailto:digem.team@gmail.com">
              digem.team@gmail.com <span aria-hidden="true">→</span>
            </a>

            <ul className="contact-reasons">
              <li>
                <i className="fas fa-comments"></i>
                <span>Have a question about the team or our project? Just ask.</span>
              </li>
              <li>
                <i className="fas fa-handshake"></i>
                <span>Looking to sponsor or partner? Let us know your organization's goals.</span>
              </li>
              <li>
                <i className="fas fa-graduation-cap"></i>
                <span>Faculty or department inquiry? We'd love to collaborate.</span>
              </li>
            </ul>

            <div className="contact-intro-extra">
              <div className="contact-intro-social">
                <a href="https://www.instagram.com/dig.em.aggies/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/tamu-dig-em-aggies/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <ContactForm formTitle="Start a conversation." isSponsorForm={false} />
        </section>
      </div>
    </div>
  );
};

export default Contact;
