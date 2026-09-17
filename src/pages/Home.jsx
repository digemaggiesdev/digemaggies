import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectSelector from '../components/ProjectSelector';
import {
  teamStats,
  faqList,
  sponsorsData,
  machineTelemetry,
  engineeringMilestones,
  memberTestimonials
} from '../data/siteData';

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}</span>;
};

const Home = () => {
  const canvasRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // FAQ Question Submission State
  const [faqFormData, setFaqFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [faqSubmitStatus, setFaqSubmitStatus] = useState({
    submitting: false,
    message: '',
    type: ''
  });

  const handleFaqFormChange = (e) => {
    setFaqFormData({
      ...faqFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    setFaqSubmitStatus({ submitting: true, message: 'Submitting question...', type: '' });

    const payload = {
      access_key: '470a65df-bb10-4b57-90e1-e2f9750e6e74',
      subject: 'New FAQ Question Submitted - Dig Em Aggies',
      name: faqFormData.name,
      email: faqFormData.email,
      message: `FAQ Question: ${faqFormData.question}`
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setFaqSubmitStatus({
          submitting: false,
          message: 'Thank you! Your question has been submitted to our team.',
          type: 'success'
        });
        setFaqFormData({ name: '', email: '', question: '' });
      } else {
        setFaqSubmitStatus({
          submitting: false,
          message: 'Unable to submit question. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error(error);
      setFaqSubmitStatus({
        submitting: false,
        message: 'Error submitting question. Please try again.',
        type: 'error'
      });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

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
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.alpha = Math.random() * 0.6 + 0.2;
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

    const initParticles = (count = 70) => {
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

  const allSponsors = [...sponsorsData.gold, ...sponsorsData.silver, ...sponsorsData.maroon];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/renders/Render1.png')" }}></div>
        <div className="hero-overlay"></div>
        <canvas ref={canvasRef} id="heroParticles" className="hero-canvas"></canvas>

        <div className="container hero-grid-container">
          <div className="hero-left">
            <div className="hero-status-pill">
              <span className="pulse-dot"></span>
              <span>DIG 'EM AGGIES • CURVED MICROTUNNELING DESIGN</span>
            </div>
            
            <div className="eyebrow">Student Engineering Innovation</div>
            <h1 className="hero-title">
              <span className="hero-title-brand">Dig 'Em <span className="highlight-gold">Aggies</span></span>
              <span className="hero-title-tagline">Pioneering Autonomous Tunnel Boring Systems</span>
            </h1>
            <p className="lead">
              Dig ‘Em Aggies is a student-run engineering team designing, fabricating, and operating horizontal tunnel boring machines to revolutionize underground transit.
            </p>
            
            <div className="hero-highlights">
              <div className="highlight-badge">
                <i className="fas fa-bolt"></i> 7.5 hp Electric HPU
              </div>
              <div className="highlight-badge">
                <i className="fas fa-bullseye"></i> 30m Bastrop Track
              </div>
              <div className="highlight-badge">
                <i className="fas fa-cogs"></i> Segment Jacking
              </div>
            </div>
            
            <div className="cta">
              <a className="btn" href="#projects">
                Explore The Machine <span aria-hidden="true">↓</span>
              </a>
              <Link className="btn btn-secondary" to="/sponsor">
                Sponsor Our Build <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-showcase-card floating-animation">
              <div className="showcase-badge">
                <span className="live-dot"></span> ACTIVE COMPETITION MACHINE
              </div>
              <div className="showcase-render-wrapper">
                <img
                  src="/assets/renders/Render1.png"
                  alt="Boring Machine Mk-I CAD Render"
                  className="showcase-render"
                />
              </div>
              <div className="showcase-info">
                <h3>Boring Machine Mk-I</h3>
                <p className="showcase-tagline">Earth Pressure Balance Horizontal TBM</p>
                <div className="showcase-mini-specs">
                  <div>
                    <span>Diameter</span>
                    <strong>24 Inches</strong>
                  </div>
                  <div>
                    <span>Drive</span>
                    <strong>High-Torque Hydraulic</strong>
                  </div>
                  <div>
                    <span>Guidance</span>
                    <strong>Laser Sensor Target</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Telemetry Grid (Swissloop & UW Tunneling Style) */}
      <section className="telemetry-bar-section">
        <div className="container">
          <div className="telemetry-grid">
            {machineTelemetry.map((item, index) => (
              <div key={index} className="telemetry-card">
                <span className="telemetry-value">{item.value}</span>
                <span className="telemetry-label">{item.label}</span>
                <span className="telemetry-subtext">{item.subtext}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Mission Section */}
        <section id="about" className="card mission-section">
          <div className="mission-container">
            <div className="mission-text">
              <p className="section-kicker">Purpose &amp; Direction</p>
              <h2>Our Mission</h2>
              <p>
                Dig 'Em Aggies brings together diverse engineering talent to pioneer high-torque cutting mechanisms, automated liner installation, and precision telemetry systems. We embody the Aggie spirit of leadership, integrity, and technical excellence.
              </p>
              <hr className="section-rule" />
              <h2>Our Design Direction</h2>
              <p>
                Our flagship machine, the Boring Machine Mk-I, is engineered to bore and reinforce a 30-meter underground tunnel with directional laser guidance and zero additive residue.
              </p>
            </div>
            <figure className="mission-image">
              <img src="/assets/team/homepage.jpg" alt="Dig 'Em Aggies team presenting the TBM" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* Interactive Project Selector */}
        <ProjectSelector />

        {/* Team Section */}
        <section className="card team-section">
          <p className="section-kicker">Multi-Disciplinary Excellence</p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Machine Profile</h2>
          <div className="stats">
            {teamStats.map((stat, index) => (
              <div key={index} className="stat">
                <h3><AnimatedCounter target={stat.target} />{stat.suffix}</h3>
                <div>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Competition Section */}
        <section className="card competition-section">
          <div className="competition-container">
            <div className="competition-text">
              <p className="section-kicker">The Global Challenge</p>
              <h2>The Not-a-Boring Competition</h2>
              <p>
                Founded to revolutionize infrastructure, the Not-a-Boring Competition challenges top universities world-wide to design and operate tunnel boring machines. Concluding in a live dig week in Bastrop, Texas, teams showcase cutting speed, accuracy, and structural integrity.
              </p>
            </div>
            <figure className="competition-image">
              <img src="/assets/team/home2.jpg" alt="Dig 'Em Aggies team at competition site" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* Engineered for Impact — TAMU SAE Quote Block */}
        <section className="card impact-section">
          <div className="impact-container">
            <p className="section-kicker">Engineered for Impact</p>
            <h2>Hear directly from our members about their experience with Dig 'Em Aggies.</h2>
            <blockquote className="impact-quote">
              “This is the best place to learn hands-on engineering skills, and on top of that, you're doing it with your best friends while advancing tunneling technology for Texas A&amp;M.”
            </blockquote>
            <div className="impact-author">
              <img src="/assets/team/leadership/Jett_Davis.jpg" alt="Jett Davis" className="author-avatar" />
              <div>
                <p className="author-name">Jett Davis</p>
                <p className="author-role">Class of '27, Mechanical Engineering — Chief Executive Officer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Build Process */}
        <section className="build-process" aria-labelledby="build-process-title">
          <div className="process-heading">
            <p className="section-kicker">Engineering Lifecycle</p>
            <h2 id="build-process-title">How We Build</h2>
          </div>
          <div className="process-grid">
            <article className="process-step">
              <span>01</span>
              <h3>CAD &amp; Simulation</h3>
              <p>Finite element analysis, soil mechanics modeling, and high-torque gearbox design.</p>
            </article>
            <article className="process-step">
              <span>02</span>
              <h3>Fabrication</h3>
              <p>Precision CNC machining, welding cutterhead disc arrays, and hydraulic plumbing.</p>
            </article>
            <article className="process-step">
              <span>03</span>
              <h3>Telemetry &amp; Control</h3>
              <p>CAN bus diagnostic integration, laser trajectory targeting, and emergency cutoff safety.</p>
            </article>
            <article className="process-step">
              <span>04</span>
              <h3>Live Dig</h3>
              <p>Deploying the machine underground in Bastrop, TX for a real-world 30-meter bore.</p>
            </article>
          </div>
        </section>

        {/* Engineering Roadmap & Milestones (UW & Swissloop style) */}
        <section className="card roadmap-section" id="roadmap">
          <div className="process-heading">
            <p className="section-kicker">Season Milestones</p>
            <h2>Engineering Roadmap</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.5rem auto 2.5rem auto' }}>
              From initial CAD soil mechanics modeling to the live Bastrop NABC dig track, track our team's progress.
            </p>
          </div>

          <div className="roadmap-grid">
            {engineeringMilestones.map((milestone, idx) => (
              <div key={idx} className="roadmap-card">
                <div className="roadmap-header">
                  <span className="roadmap-phase">Phase {milestone.phase}</span>
                  <span className={`roadmap-status ${milestone.status.toLowerCase().replace(' ', '-')}`}>
                    {milestone.status}
                  </span>
                </div>
                <h3>{milestone.title}</h3>
                <p className="roadmap-date">{milestone.date}</p>
                <p className="roadmap-desc">{milestone.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="card faq-section" id="faq">
          <div className="faq-header">
            <p className="section-kicker">Frequently Asked Questions</p>
            <h2>Everything You Need to Know</h2>
          </div>
          <div className="faq-list">
            {faqList.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit Your Own Question Form */}
          <div className="faq-ask-box">
            <h3>Have a Question Not Listed Here?</h3>
            <p>Submit your question below and our team will get back to you shortly.</p>
            
            <form className="faq-ask-form" onSubmit={handleFaqSubmit}>
              <div className="faq-ask-row">
                <div className="form-group">
                  <label htmlFor="faq-name">Your Name</label>
                  <input
                    type="text"
                    id="faq-name"
                    name="name"
                    value={faqFormData.name}
                    onChange={handleFaqFormChange}
                    placeholder="E.x. John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="faq-email">Email Address</label>
                  <input
                    type="email"
                    id="faq-email"
                    name="email"
                    value={faqFormData.email}
                    onChange={handleFaqFormChange}
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="faq-question">Your Question</label>
                <textarea
                  id="faq-question"
                  name="question"
                  rows={3}
                  value={faqFormData.question}
                  onChange={handleFaqFormChange}
                  placeholder="What would you like to ask the team?"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-submit"
                disabled={faqSubmitStatus.submitting}
              >
                {faqSubmitStatus.submitting ? 'Submitting...' : 'Submit Question →'}
              </button>

              {faqSubmitStatus.message && (
                <p className={`form-message ${faqSubmitStatus.type}`} role="status" aria-live="polite">
                  {faqSubmitStatus.message}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="card sponsors-section" style={{ textAlign: 'center' }}>
          <p className="section-kicker">Industry &amp; Academic Partners</p>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '1rem' }}>Supported By Industry Leaders</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Our corporate and departmental sponsors empower student engineers to build groundbreaking technology.
          </p>
          <div className="sponsor-logos" style={{ borderTop: 'none', paddingTop: 0 }}>
            {allSponsors.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-logo"
                title={sponsor.name}
              >
                <img src={sponsor.image} alt={sponsor.name} loading="lazy" />
              </a>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <Link className="btn btn-secondary btn-small" to="/sponsor">
              Become a Corporate Sponsor <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* TAMU SAE Style Information Banner */}
        <section className="card sae-more-info">
          <h2>WANT MORE INFORMATION?</h2>
          <p>Connect with Dig 'Em Aggies for recruitment, sponsorships, or general inquiries.</p>
          <div className="sae-info-buttons">
            <Link className="btn btn-secondary" to="/contact">
              Contact Us
            </Link>
            <Link className="btn btn-secondary" to="/sponsor">
              Sponsor Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
