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
            <Link
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={location.pathname === '/about' ? 'active' : ''}
              onClick={closeMenu}
            >
              About
            </Link>
            <Link
              to="/sponsor"
              className={location.pathname === '/sponsor' ? 'active' : ''}
              onClick={closeMenu}
            >
              Sponsor
            </Link>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={closeMenu}
            >
              Contact
            </Link>
            <Link
              to="/sponsor"
              className="nav-cta"
              onClick={closeMenu}
            >
              <span>Sponsor Us</span>
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
