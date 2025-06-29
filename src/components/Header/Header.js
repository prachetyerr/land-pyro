import React from 'react';
import './Header.css';

const Header = ({ isScrolled, isMenuOpen, setIsMenuOpen, navRef, handleLinkClick }) => {
  return (
    <header className={`top-nav ${isScrolled ? "fixed-header" : ""}`}>
      <a href="#home" className="brand-logo-text" onClick={handleLinkClick}>
        PyroSynergy
      </a>
      <nav ref={navRef} className="main-navigation">
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="mobile-nav-wrapper">
          <button
            className="hamburger-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
          <ul className={`mobile-nav ${isMenuOpen ? "is-active" : ""}`}>
            <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
            <li><a href="#services" onClick={handleLinkClick}>Services</a></li>
            <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;