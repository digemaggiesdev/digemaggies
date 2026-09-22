import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { coreValues, facultyAdvisor, executiveTeam } from '../data/siteData';
import { useScrollReveal } from '../hooks/useScrollReveal';

const teamOverviewStats = [
  { value: '40', label: 'Team Members' },
  { value: '4', label: 'Class Levels' },
  { value: '10+', label: 'Different Majors' }
];

const subteamsData = [
  {
    name: 'Cutterhead/Chassis',
    lead: 'Drive Train & Articulation',
    image: '/assets/team/subteams/Cutterhead Chassis.jpg',
    description: 'Designs the four-spoke cutterhead, 80:1 gearbox drive train, muck chamber, bearing support, and segmented chassis that allows the cutterhead to articulate.'
  },
  {
    name: 'Extraction',
    lead: 'Slurry & Muck Removal',
    image: '/assets/team/subteams/Extraction.jpg',
    description: 'Creates the bentonite-and-water slurry process, including the injection pump, inflow line, outflow line, and vacuum-truck connection used to remove excavated muck.'
  },
  {
    name: 'Propulsion',
    lead: 'HPU, Pipe Jacking & Steering',
    image: '/assets/team/subteams/Propulsion.jpg',
    description: 'Develops the electric HPU, pipe-jacking system, hydraulic cylinders, and electro-hydraulic actuators that provide thrust and control the cutterhead direction.'
  },
  {
    name: 'Tunnel Lining',
    lead: 'Steel Segments & Cradle',
    image: '/assets/team/subteams/Tunnel_Lining.jpg',
    description: 'Designs the steel tunnel segments that provide a thrust surface and maintain alignment, along with the cradle that supports the TBM and segments during mining.'
  },
  {
    name: 'Electronics',
    lead: 'Power, Sensors & Safety',
    image: '/assets/team/subteams/Electrical.jpg',
    description: 'Builds the power distribution and safety systems, including the 480 V three-phase input, VFD, control power supplies, sensors, relays, and emergency-stop circuitry.'
  },
  {
    name: 'Software',
    lead: 'Controls, HMI & Telemetry',
    image: '/assets/team/subteams/Software.jpg',
    description: 'Develops the Raspberry Pi operator interface, serial communication with the onboard controller, machine controls, safety interlocks, telemetry displays, and sensor data visualization.'
  },
  {
    name: 'Business',
    lead: 'Funding, Logistics & Outreach',
    image: '/assets/team/subteams/Business.jpg',
    description: 'Coordinates sponsorships, fundraising, purchasing, meeting and fabrication space, testing arrangements, transportation, housing, team communications, and the website.'
  },
  {
    name: 'Integration',
    lead: 'Subsystem Testing & Full-Machine Validation',
    image: '/assets/team/subteams/Integration.jpg',
    description: 'Coordinates virtual integration, subsystem test protocols, mock integration tests, full-system testing, mining procedures, and final preparation for competition.'
  }
];

const About = () => {
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
    <div className="about-page" ref={pageRef}>
      {/* Hero Section */}
      <section className="hero about-hero-split">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/team/homepage.jpg')" }}></div>
        <div className="hero-overlay"></div>
        <canvas ref={canvasRef} className="hero-canvas"></canvas>

        <div className="container hero-grid-container">
          <div className="hero-left">
            <div className="hero-status-pill">
              <span className="pulse-dot"></span>
              <span>DIG 'EM AGGIES • WHO WE ARE</span>
            </div>
            <div className="eyebrow">Aggie Spirit &amp; Innovation</div>
            <h1 className="hero-title">
              Advancing <span className="highlight-gold">Tunneling</span> Technology
            </h1>
            <p className="lead">
              Dig 'Em Aggies is a student engineering team focused on designing, building, and competing with tunnel boring technology.
            </p>

            <div className="hero-highlights">
              <div className="highlight-badge">
                <i className="fas fa-ruler-horizontal"></i> 24 in TBM Diameter
              </div>
              <div className="highlight-badge">
                <i className="fas fa-arrows-alt-h"></i> 30 m Target Tunnel
              </div>
              <div className="highlight-badge">
                <i className="fas fa-trophy"></i> NABC Competitor
              </div>
            </div>

            <div className="cta">
              <a className="btn" href="#leadership">
                Meet Executive Team <span aria-hidden="true">↓</span>
              </a>
              <a className="btn btn-secondary" href="#subteams">
                Explore Subteams <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-showcase-card floating-animation">
              <div className="showcase-badge">
                <span className="live-dot"></span> STUDENT ORGANIZATIONS
              </div>
              <div className="showcase-render-wrapper">
                <img
                  src="/assets/team/homepage.jpg"
                  alt="Dig 'Em Aggies Team Group Photo"
                  className="showcase-render"
                />
              </div>
              <div className="showcase-info">
                <h3>Dig 'Em Aggies</h3>
                <p className="showcase-tagline">A Texas A&amp;M student engineering team</p>
                <p className="showcase-description">
                  We design and build advanced tunnel boring systems while creating an experience that develops members through hands-on engineering, collaboration, and leadership.
                </p>
              </div>
            </div>
          </div>
        </div>

        <svg className="hero-wave-divider" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <pattern id="paper-grid" width="36" height="36" patternUnits="userSpaceOnUse">
              <rect width="36" height="36" fill="#e8ecf1"></rect>
              <path d="M36 0H0V36" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1"></path>
            </pattern>
          </defs>
          <path fill="var(--tamu-maroon)" d="M0,40 C240,100 480,0 720,30 C960,60 1200,110 1440,50 L1440,0 L0,0 Z"></path>
        </svg>
      </section>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Team Overview */}
        <section className="card team-section about-team-stats reveal" id="team-stats">
          <div className="faq-header">
            <p className="eyebrow">The People Behind the Machine</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>A Team Built Across Disciplines</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Our team brings together Aggies from every stage of their degree and a wide range of academic backgrounds.
            </p>
          </div>
          <div className="stats">
            {teamOverviewStats.map((stat) => (
              <div key={stat.label} className="stat">
                <h3>{stat.value}</h3>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="card core-values reveal" id="core-values">
          <div className="faq-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <p className="eyebrow">What Guides Us</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Core Values</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Our team operates on the fundamental Aggie values of excellence, integrity, leadership, and selfless service.
            </p>
          </div>
          <div className="values-grid">
            {coreValues.map((value, idx) => (
              <div key={idx} className="value-card">
                <h3>
                  <i className={`fas ${value.icon}`}></i> {value.title}
                </h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subteams & Disciplines Showcase */}
        <section className="card subteams-section reveal" id="subteams">
          <div className="faq-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <p className="eyebrow">Multidisciplinary Engineering</p>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Our Subteams</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              From the cutterhead and slurry system to controls, logistics, and full-machine testing, every discipline has a defined role in the PDB design.
            </p>
          </div>
          <div className="subteams-grid">
            {subteamsData.map((subteam, idx) => (
              <div key={idx} className="subteam-card">
                <div className="subteam-image-wrapper">
                  <img src={subteam.image} alt={subteam.name} loading="lazy" />
                  <span className="subteam-badge">{subteam.lead}</span>
                </div>
                <div className="subteam-content">
                  <h3>{subteam.name}</h3>
                  <p>{subteam.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Faculty Advisor */}
        <section className="card faculty-advisor reveal" id="faculty-advisor">
          <p className="eyebrow">Technical Guidance</p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Faculty Advisor</h2>
          <div className="advisor-card">
            <img src={facultyAdvisor.image} alt={facultyAdvisor.name} loading="lazy" />
            <div>
              <h3>{facultyAdvisor.name}</h3>
              <p className="department">{facultyAdvisor.department}</p>
              <p className="bio">{facultyAdvisor.bio}</p>
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="card leadership reveal" id="leadership">
          <p className="eyebrow">The Builders &amp; Leaders</p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Executive Officers</h2>
          <div className="leadership-grid">
            {executiveTeam.map((member, idx) => (
              <div key={idx} className="leader-card">
                <img src={member.image} alt={`${member.name}, ${member.role}`} loading="lazy" />
                <h3>{member.name}</h3>
                <p className="position">{member.role}</p>
                <p className="class-major">{member.classMajor}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                >
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
