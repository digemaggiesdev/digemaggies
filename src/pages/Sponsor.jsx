import React, { useEffect, useRef } from 'react';
import FundingChart from '../components/FundingChart';
import ContactForm from '../components/ContactForm';
import { sponsorsData } from '../data/siteData';

const sponsorMetrics = [
  { value: '$30,000', label: '2025 Build Budget Goal', subtext: 'Raw Materials & Components' },
  { value: '47+', label: 'Aggie Engineers Reached', subtext: 'Multidisciplinary Majors' },
  { value: '100%', label: 'Tax Deductible Partner', subtext: 'Student Organization RSO' },
  { value: 'Bastrop, TX', label: 'Live Dig Site Showcase', subtext: 'Not-a-Boring Competition' }
];

const Sponsor = () => {
  const canvasRef = useRef(null);

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

  return (
    <div className="sponsor-page">
      {/* Funding Hero */}
      <section className="hero sponsor-hero-split">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/renders/Render3.png')" }}></div>
        <div className="hero-overlay"></div>
        <canvas ref={canvasRef} className="hero-canvas"></canvas>

        <div className="container hero-grid-container">
          <div className="hero-left">
            <div className="hero-status-pill">
              <span className="pulse-dot"></span>
              <span>TEXAS A&amp;M NABC • SPONSORSHIP OPPORTUNITIES</span>
            </div>
            <div className="eyebrow">Support Student Innovation</div>
            <h1 className="hero-title">
              Empower Aggie <span className="highlight-gold">Engineers</span> Underground
            </h1>
            <p className="lead">
              Every corporate partnership directly funds raw materials, high-precision machining, and competition logistics for the Not-a-Boring Competition.
            </p>

            <div className="hero-highlights">
              <div className="highlight-badge">
                <i className="fas fa-handshake"></i> Resume Book Access
              </div>
              <div className="highlight-badge">
                <i className="fas fa-microchip"></i> Logo on TBM Chassis
              </div>
              <div className="highlight-badge">
                <i className="fas fa-bullhorn"></i> Event Recognition
              </div>
            </div>

            <div className="cta">
              <a className="btn" href="#sponsor-contact">
                Become a Sponsor <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn-secondary" href="#tiers">
                View Tiers <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-showcase-card floating-animation">
              <div className="showcase-badge">
                <span className="live-dot"></span> 2026 FUNDING CAMPAIGN
              </div>
              <div style={{ padding: '1rem 0' }}>
                <FundingChart raised={1000} goal={30000} />
              </div>
              <div className="showcase-info" style={{ textAlign: 'center' }}>
                <h3>Help Us Reach $30,000</h3>
                <p className="showcase-tagline">Not-a-Boring Competition Bastrop Dig Track</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Metrics Bar */}
      <section className="telemetry-bar-section">
        <div className="container">
          <div className="telemetry-grid">
            {sponsorMetrics.map((item, index) => (
              <div key={index} className="telemetry-card">
                <span className="telemetry-value">{item.value}</span>
                <span className="telemetry-label">{item.label}</span>
                <span className="telemetry-subtext">{item.subtext}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        <div className="sponsor-page-header" id="tiers">
          <p className="eyebrow">Partnership Options</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Sponsorship Tiers</h1>
          <p>We offer tailored package benefits for corporate, departmental, and individual supporters.</p>
        </div>

        <div className="sponsor-tiers">
          {/* Gold Tier */}
          <section className="sponsor-tier-card gold">
            <h2>Gold Sponsors ($1,000+)</h2>
            <div className="tier-bar"></div>
            <ul className="tier-benefits">
              <li>All Maroon tier benefits</li>
              <li>Official team shirt &amp; hardhat</li>
              <li>Company meet-and-greet at team meeting</li>
              <li>Prominent large logo placement on TBM</li>
            </ul>
            <div className="sponsor-logos">
              {sponsorsData.gold.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="sponsor-logo" title={s.name}>
                  <img src={s.image} alt={s.name} />
                </a>
              ))}
            </div>
          </section>

          {/* Silver Tier */}
          <section className="sponsor-tier-card silver">
            <h2>Silver Sponsors ($500+)</h2>
            <div className="tier-bar"></div>
            <ul className="tier-benefits">
              <li>All Maroon tier benefits</li>
              <li>Sponsored Instagram post feature</li>
              <li>Sponsored LinkedIn announcement</li>
              <li>Medium logo placement on TBM</li>
            </ul>
            <div className="sponsor-logos">
              {sponsorsData.silver.map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" rel="noopener noreferrer" className="sponsor-logo" title={s.name}>
                  <img src={s.image} alt={s.name} />
                </a>
              ))}
            </div>
          </section>

          {/* Maroon Tier */}
          <section className="sponsor-tier-card maroon">
            <h2>Maroon Sponsors ($100+)</h2>
            <div className="tier-bar"></div>
            <ul className="tier-benefits">
              <li>Company logo on official t-shirts</li>
              <li>Recognition at local events &amp; competition</li>
              <li>Company logo featured on website</li>
              <li>Small logo placement on TBM</li>
              <li>Aggie engineer student resume book</li>
              <li>Exclusive Dig Day site invitation</li>
            </ul>
            <div className="sponsor-logos">
              {sponsorsData.maroon.map((s, idx) => (
                <a key={idx} href={s.url} className="sponsor-logo" title={s.name}>
                  <img src={s.image} alt={s.name} />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Sponsor Contact Section */}
        <section id="sponsor-contact" className="card contact-section">
          <div className="contact-intro">
            <p className="eyebrow">Let’s Build The Future Underground</p>
            <h1 style={{ fontSize: '2.5rem' }}>Start a Sponsorship Conversation</h1>
            <p>Tell us what you have in mind. We’ll follow up with sponsorship details, partnership opportunities, and ways your organization can support the build.</p>
            <a className="contact-email" href="mailto:digem.team@gmail.com">
              digem.team@gmail.com <span aria-hidden="true">→</span>
            </a>
          </div>

          <ContactForm isSponsorForm={true} />
        </section>
      </div>
    </div>
  );
};

export default Sponsor;
