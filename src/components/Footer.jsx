import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <Link to="/">
              <img src="/assets/logo/Dig_Em_Logo.png" alt="Dig 'Em Aggies logo" />
            </Link>
            <p>
              Texas A&M NABC Team<br />
              College Station, TX<br />
              <a href="mailto:digem.team@gmail.com">digem.team@gmail.com</a>
            </p>
          </div>

          <div className="footer-right">
            <h3>Follow Us</h3>
            <div className="social-links">
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
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Texas A&M NABC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
