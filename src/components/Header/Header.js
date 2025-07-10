import React from 'react';
import './Header.css';

const Header = ({ isScrolled, isMenuOpen, setIsMenuOpen, navRef, handleLinkClick }) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (handleLinkClick) {
      handleLinkClick();
    }
  };

  return (
    <header className={`top-nav ${isScrolled ? "fixed-header" : ""}`}>
      <a 
        href="#home" 
        className="brand-logo-text" 
        onClick={(e) => handleNavClick(e, 'home')}
      >
        PyroSynergy
      </a>
      <nav ref={navRef} className="main-navigation">
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
          <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Solutions</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
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
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Solutions</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;