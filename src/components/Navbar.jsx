import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <div className="brand">
            <Link to="/" onClick={closeMenu}>
              <img src="/assets/logo/Dig_Em_Logo.png" alt="Dig 'Em Aggies logo" />
            </Link>
          </div>

          <button
            className={`menu-toggle ${isOpen ? 'open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-links ${isOpen ? 'open' : ''}`} id="main-navigation">
            <div className="mobile-nav-header">
              <span className="mobile-nav-title">Texas A&amp;M Tunneling</span>
              <p className="mobile-nav-subtitle">Dig 'Em Aggies NABC Team</p>
            </div>
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeMenu}
            >
              <i className="fas fa-home mobile-nav-icon"></i>
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={closeMenu}
            >
              <i className="fas fa-users mobile-nav-icon"></i>
              <span>About</span>
            </Link>
            <Link
              to="/sponsor"
              className={location.pathname === '/sponsor' ? 'active' : ''}
              onClick={closeMenu}
            >
              <i className="fas fa-handshake mobile-nav-icon"></i>
              <span>Sponsor</span>
            </Link>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={closeMenu}
            >
              <i className="fas fa-envelope mobile-nav-icon"></i>
              <span>Contact</span>
            </Link>
            <Link
              to="/sponsor"
              className="nav-cta mobile-nav-cta"
              onClick={closeMenu}
            >
              <span>Sponsor Us</span>
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </Link>
            <div className="mobile-nav-footer">
              <div className="mobile-social-links">
                <a
                  href="https://www.instagram.com/dig.em.aggies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/tamu-dig-em-aggies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <p>Gig 'Em Aggies 👍</p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
