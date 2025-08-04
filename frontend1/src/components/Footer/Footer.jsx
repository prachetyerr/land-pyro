import React from 'react';
import './Footer.css';
import grids from "../../assets/Frame 41.png";

const Footer = () => {
  return (
    <>
      <div className="decorative-grid-container">
        <img
          src={grids}
          alt="Decorative grids"
          className="decorative-grid-image"
        />
      </div>

      <footer className="footer">
        <div className="footer-names">
          <span className="brand-logo-text">PyroSynergy</span>
          <span className="brand-copyright-text">
            © Copyright 2025 Pyrosynergy AI Labs. All rights reserved.
          </span>
        </div>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/pyrosynergy/"
            aria-label="Instagram"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/pyrosynergy/"
            aria-label="LinkedIn"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
              alt="LinkedIn"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;