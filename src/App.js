import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Third-party Libraries
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faPalette,
  faRobot,
  faTimes,
  // faChevronLeft, // This is no longer used but kept for potential future use
  // faChevronRight, // This is no longer used but kept for potential future use
} from "@fortawesome/free-solid-svg-icons";

// Asset Imports
import grids from "./assets/Frame 41.png";
import logo1 from "./assets/viali.png";
import logo3 from "./assets/mih.png";
import logo5 from "./assets/riMLand.png";
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/innogeeks.png";
import logo10 from "./assets/acm.png";
import bgvideo from "./assets/bgvideo.mp4";

// --- UPDATED Data for Services Section (Based on sketches) ---
const servicesData = [
  {
    icon: faCode, // Icon for "bring it online"
    title: '"My business is solid. Now I want to bring it online."',
    shortStatement:
      "Ready to translate your established business success into a powerful digital presence?",
    outcome: [ // Changed to an array of strings
      "Establish a professional, engaging online presence.",
      "Expand your market reach beyond physical limitations.",
      "Unlock new avenues for growth and customer interaction.",
      "Build foundational credibility in the digital space.",
    ],
    ctaText: "Let's go digital",
  },
  {
    icon: faPalette, // Icon for "reaching the right audience"
    title:
      '"I\'m up and running online, but I\'m not reaching the right audience."',
    shortStatement:
      "Is your digital presence established, yet struggling to connect with valuable customers?",
    outcome: [ // Changed to an array of strings
      "Develop a targeted brand voice and messaging.",
      "Implement data-driven marketing and content strategies.",
      "Amplify visibility across relevant digital channels.",
      "Convert casual visitors into loyal customers.",
    ],
    ctaText: "Let's grow my reach",
  },
  {
    icon: faRobot, // Icon for "scale without burnout"
    title:
      '"My company is picking up, and I want to scale without the burnout."',
    shortStatement:
      "Experiencing growth pains? It's time to build systems that support expansion, not exhaustion.",
    outcome: [ // Changed to an array of strings
      "Automate repetitive tasks to free up valuable time.",
      "Integrate AI tools for enhanced efficiency and insights.",
      "Develop robust workflows for sustainable growth.",
      "Structure your operations for seamless future scaling.",
    ],
    ctaText: "Let's optimize for Scale", // Slightly adjusted CTA for clarity
  },
];


// Data for the animated hero heading
const highlightedWords = ["AI-ready.", "future-proof.", "omnichannel."];

const clientLogos = [logo1, logo3, logo5, logo7, logo8, logo9, logo10];

const openCalendarPopup = () => {
  const calendarUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0iZ6GBUpEp6xEXcYQ0wZLryUc6bprkId2iHVJjJF88E3JTJGM917FiwtH6mwtuwUuyOVr2Whwm?gv=true";
  const popupFeatures = "width=1000,height=700,scrollbars=yes,resizable=yes";
  window.open(calendarUrl, "googleCalendarPopup", popupFeatures);
};

function App() {
  // State Management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // --- STATE FOR INTERACTIVE SERVICES SECTION ---
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  // New state to track which card is closing instantly
  const [closingCardIndex, setClosingCardIndex] = useState(null);
  const closeTimerRef = useRef(null); // To manage the timeout


  // Effect to cycle through the highlighted words
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % highlightedWords.length
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // --- EVENT HANDLERS FOR INTERACTIVE SERVICES ---
  const handleCardClick = (index) => {
     // Clear any pending instant-close state if a new card is clicked
    if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
    }
    if (closingCardIndex !== null) {
        setClosingCardIndex(null); // Explicitly turn off the instant-close state for the previous card
    }

    if (expandedCardIndex !== index) {
      setExpandedCardIndex(index);
    }
    // If clicking the already expanded card, the click is on the wrapper behind the modal,
    // which should probably just keep the modal open. The close button handles closing.
  };

  // Wrap handleCloseCard in useCallback to maintain reference stability
  const handleCloseCard = useCallback((e) => {
    if (e) e.stopPropagation(); // Prevents the click from bubbling up to the card's onClick

    // Only trigger close if a card is actually expanded
    if (expandedCardIndex !== null) {
        // Clear any existing timeout before starting a new one
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }

        // Set the currently expanded card as the one that should close instantly
        setClosingCardIndex(expandedCardIndex);
        setExpandedCardIndex(null); // This will remove the 'expanded' class from the card

        // Set a timeout to remove the 'closing-instant' class after a minimal delay
        // The delay needs to be just enough for React to render the state change
        closeTimerRef.current = setTimeout(() => {
            setClosingCardIndex(null); // Remove the closing-instant class
            closeTimerRef.current = null; // Clean up the ref
        }, 50); // 50ms should be sufficient for the browser to register the change
    }
  }, [expandedCardIndex]); // Add expandedCardIndex as a dependency
  
  // ======================================================================
  // ========== NEW: EFFECT TO HANDLE BODY SCROLL ON MOBILE MODAL =========
  // ======================================================================
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Lock body scroll when a card is expanded on mobile
    if (expandedCardIndex !== null && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      // Otherwise, ensure it's unlocked
      document.body.style.overflow = "auto";
    }
    // Cleanup function to ensure scroll is always restored on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedCardIndex]); // This effect runs whenever a card is expanded or closed
  // ======================================================================


  // Click handler for mobile nav links
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Form Submission Handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    if (!email || !message) {
      setFormStatus("❌ Please fill in both fields.");
      return;
    }
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxfJZIHACfhDoy9ZtKBdi-vIgO0vFqVGdP3VpmvdSXtHVuJUHYlNDpUYUPzxLSCysVyHA/exec",
        {
          method: "POST",
          body: JSON.stringify({ email, message }),
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
        }
      );
      setFormStatus("🚀 Message sent! We will get back to you soon.");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Form submission network error: ", error);
      setFormStatus(`❌ A network error occurred. Please try again.`);
    }
  };

  // General useEffect Hooks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (formStatus) {
      const timer = setTimeout(() => setFormStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Handle escape key to close expanded card
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (expandedCardIndex !== null) { // Only close if a card is expanded
             handleCloseCard(event); // Use the modified handler
        }
      }
    };
    // The useEffect now has a stable reference to handleCloseCard
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expandedCardIndex, handleCloseCard]);

  // Handler to stop propagation for calendar button clicks inside the card
  const handleCalendarButtonClick = (e) => {
    e.stopPropagation();
    openCalendarPopup();
  };

  return (
    <div>
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

      <section id="home" className="relative flex flex-col">
        <div className="content-video-wrapper">
          <video autoPlay loop muted playsInline className="content-video-bg">
            <source src={bgvideo} type="video/mp4" />
          </video>
          <div className="content-video-fade-overlay"></div>
          <div
            className="flex flex-col items-center justify-center flex-1 content-on-top"
            style={{
              minHeight: "40vh",
              paddingTop: "130px",
              paddingBottom: "40px",
            }}
          >
            <h1 className="hero-heading leading-snug">
              <div>Let's make your business</div>
              <div className="highlighted-container">
                {highlightedWords.map((word, index) => (
                  <span
                    key={index}
                    className={`highlighted ${
                      index === highlightedIndex ? "active" : ""
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </h1>
            <p className="hero-desc">
              From strategy to scale, we rebuild and redesign your brand into
              its most{" "}
              <span className="desc-highlight">
                efficient, effective, and elegant
              </span>{" "}
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
          <div className="marquee-outer-padding-container py-8">
            <div className="marquee-inner-content-container hero-marquee">
              <Marquee speed={40} pauseOnHover gradient={false}>
                {clientLogos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`client-${idx}`}
                    className="client-logo"
                  />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================== */}
      {/* ========== REWRITTEN SERVICES SECTION STARTS HERE ========== */}
      {/* ========================================================== */}
      <section id="services" className="services-section">
        <div className="section-heading">
          <h2 className="services-title">Our Capabilities</h2>
          <p className="services-subtitle">
            We turn ambitious ideas into intelligent, scalable, and beautiful
            digital solutions.
          </p>
        </div>

        {/* This container's children will be stacked on mobile and in a row on desktop */}
        <div className="services-interactive-container">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className={`service-card-wrapper ${
                expandedCardIndex !== null
                  ? expandedCardIndex === index
                    ? "expanded"
                    : "overlay"
                  : ""
              } ${closingCardIndex === index ? 'closing-instant' : ''}`}
               // On mobile, the wrapper itself becomes the modal backdrop
              onClick={() => handleCardClick(index)}
            >
              <div className="service-card-interactive" onClick={(e) => { if (expandedCardIndex === index) e.stopPropagation() }}>
                <div className="service-card-interactive-content">
                  {/* --- Content visible when collapsed (Normal Card) --- */}
                  <div className="card-content-initial">
                    <div className="service-card-icon-wrapper transparent">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="service-card-icon"
                      />
                    </div>
                    <h3 className="service-card-title-quote">
                      {service.title}
                    </h3>
                    <div className="card-buttons-initial">
                      <button
                        className="card-cta-initial"
                        onClick={handleCalendarButtonClick}
                      >
                        {service.ctaText}
                      </button>
                      <button
                        className="know-more-btn"
                        onClick={(e) => { e.stopPropagation(); handleCardClick(index); }}
                      >
                        Know More
                      </button>
                    </div>
                  </div>

                  {/* --- Content visible when expanded (Full-screen Card) --- */}
                  <div className="card-content-expanded">
                    <div className="expanded-header">
                      <div className="service-card-icon-wrapper">
                        <FontAwesomeIcon
                          icon={service.icon}
                          className="service-card-icon"
                        />
                      </div>
                      <h2 className="modal-title">{service.title}</h2>
                    </div>

                    <p className="modal-statement">{service.shortStatement}</p>

                    <div className="modal-outcome">
                      {service.outcome.map((point, idx) => (
                        <p key={idx} className="outcome-point">{point}</p>
                      ))}
                    </div>

                    <button
                      className="modal-cta-btn"
                      onClick={openCalendarPopup}
                    >
                      {service.ctaText}
                    </button>
                  </div>
                </div>

                {/* The close button is part of the interactive card */}
                <button
                  className="card-close-btn"
                  onClick={handleCloseCard}
                  aria-label="Close details"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ======================================================== */}
      {/* ========== REWRITTEN SERVICES SECTION ENDS HERE ========== */}
      {/* ======================================================== */}

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
          <form className="form" onSubmit={handleFormSubmit}>
            <div className="input-wrapper">
              <textarea
                name="message"
                placeholder="Enter your message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="horizontal-group">
              <div className="input-wrapper email-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="form-submit-button">
                Submit
              </button>
            </div>
          </form>
          {formStatus && (
            <p
              className={`form-status-message ${
                formStatus.startsWith("❌") ? "error" : "success"
              }`}
            >
              {formStatus}
            </p>
          )}
        </div>
      </section>

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
    </div>
  );
}

export default App;