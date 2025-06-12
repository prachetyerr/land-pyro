import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Marquee from "react-fast-marquee";
import grids from "./assets/Frame 41.png";
import logo1 from "./assets/viali.png";
import logo2 from "./assets/tanvi.png";
import logo3 from "./assets/mih.png";
import logo4 from "./assets/grind time rides.png";
import logo5 from "./assets/riMLand.png";
import logo6 from "./assets/yourbest.png";
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/innogeeks.png";
import logo10 from "./assets/acm.png";
import bgvideo from "./assets/bgvideo.mp4";

const clientLogos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
];

const openCalendarPopup = () => {
  const calendarUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0iZ6GBUpEp6xEXcYQ0wZLryUc6bprkId2iHVJjJF88E3JTJGM917FiwtH6mwtuwUuyOVr2Whwm?gv=true";
  const popupFeatures = "width=1000,height=700,scrollbars=yes,resizable=yes";
  window.open(calendarUrl, "googleCalendarPopup", popupFeatures);
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="top-nav">
        <a href="#home" className="brand-logo-text" onClick={handleLinkClick}>
          Pyrosynergy
        </a>
        
        <nav ref={navRef} className={`main-navigation ${isScrolled ? "fixed-nav" : ""}`}>
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
              aria-label="Toggle navigation menu"
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

      <section id="home" className="relative flex flex-col">
        <div className="content-video-wrapper">
          <video autoPlay loop muted playsInline className="content-video-bg">
            <source src={bgvideo} type="video/mp4" />
          </video>
          <div className="content-video-fade-overlay"></div>
          <div
            className="flex flex-col items-center justify-center flex-1 content-on-top"
            style={{ minHeight: "40vh", paddingTop: "130px", paddingBottom: "40px" }}
          >
            <h1 className="hero-heading leading-snug">
              <div>Let's make your business</div>
              <div className="highlighted">AI-ready.</div>
            </h1>
            <p className="hero-desc">
              From strategy to scale, we rebuild and redesign your brand into
              its most{" "}
              <span className="desc-highlight">efficient, effective, and elegant</span>{" "}
              form — empowering you to{" "}
              <span className="desc-italic">outgrow</span> your competitors in
              sales and success.
            </p>
            <button
              className="hero-button mx-auto mb-8 md:mb-12"
              onClick={openCalendarPopup}
            >
              schedule a <span className="free-highlight">FREE</span> strategy
              call
            </button>
          </div>
          <div className="height"></div>
          <div className="w-full max-w-7xl mx-auto py-8 flex justify-center items-center hero-marquee">
            <Marquee speed={40} pauseOnHover gradient={false}>
              {clientLogos.map((logo, idx) => (
                <img key={idx} src={logo} alt={`client-${idx}`} className="client-logo" />
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section id="services" className="invisible-section"></section>

      <section id="contact" className="form-section">
        <div className="form-text-wrapper">
          <p className="form-intro">
            Let’s be clear and honest: Your business NEEDS a{" "}
            <span className="personalized-highlight">personalized</span>{" "}
            solution.
          </p>
          <p className="form-desc">
            Let’s keep this organic and deliver EXACTLY what you’re looking for.
            Drop in your email, and let’s discuss this together.
          </p>
        </div>
        <div className="form-container">
          <form className="form">
            <div className="input-wrapper">
              <textarea name="message" placeholder="Enter your message" rows="4" />
            </div>
            <div className="horizontal-group">
              <div className="input-wrapper email-field">
                <input type="email" name="email" placeholder="Enter your email" />
              </div>
              <button type="submit" className="form-submit-button">Submit</button>
            </div>
          </form>
        </div>
      </section>

      <div className="decorative-grid-container">
        <img src={grids} alt="Decorative grids" className="decorative-grid-image" />
      </div>

      <footer className="footer">
        <div className="footer-names">
          <span className="brand-logo-text">Pyrosynergy</span>
          <span className="brand-copyright-text">
            © Copyright 2025 Pyrosynergy AI Labs. All rights reserved.
          </span>
        </div>
        <div className="social-icons">
          <a href="#" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;