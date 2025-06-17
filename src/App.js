import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// Third-party Libraries
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faPalette,
  faRobot,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Asset Imports
import grids from "./assets/Frame 41.png";
import logo1 from "./assets/viali.png";
// import logo2 from "./assets/tanvi.png"; // Assuming this was intentionally commented out
import logo3 from "./assets/mih.png";
// import logo4 from "./assets/grind time rides.png"; // Assuming this was intentionally commented out
import logo5 from "./assets/riMLand.png";
// import logo6 from "./assets/yourbest.png"; // Assuming this was intentionally commented out
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/innogeeks.png";
import logo10 from "./assets/acm.png";
import bgvideo from "./assets/bgvideo.mp4";

// --- Data for Services Section ---
const servicesData = [
  {
    icon: faRobot,
    title: "AI-Powered Automation",
    shortDesc:
      "Streamline workflows, reduce manual tasks, and unlock peak efficiency with custom-trained AI models.",
    details: {
      heading: "Bespoke AI for Your Business",
      points: [
        "Custom AI model training and seamless integration.",
        "Intelligent process automation for repetitive tasks.",
        "Advanced data analysis and predictive insights.",
      ],
    },
  },
  {
    icon: faCode,
    title: "Web & App Development",
    shortDesc:
      "From elegant landing pages to complex web applications, we build fast, secure, and beautiful digital experiences.",
    details: {
      heading: "Digital Experiences that Perform",
      points: [
        "Responsive, high-performance website development.",
        "Scalable full-stack web application architecture.",
        "Secure APIs and robust database integration.",
      ],
    },
  },
  {
    icon: faPalette,
    title: "Brand & UI/UX Design",
    shortDesc:
      "We craft stunning brand identities and intuitive user interfaces that captivate your audience and drive engagement.",
    details: {
      heading: "Design that Drives Connection",
      points: [
        "Comprehensive brand identity and strategy.",
        "User-centric UI/UX research and design.",
        "Creation of cohesive and memorable visual systems.",
      ],
    },
  },
];

// Data for the animated hero heading
const highlightedWords = ["AI-ready.", "future-proof.", "omnichannel."];

const clientLogos = [
  logo1,
  // logo2,
  logo3,
  // logo4,
  logo5,
  // logo6,
  logo7,
  logo8,
  logo9,
  logo10,
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Effect to cycle through the highlighted words
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex(
        (prevIndex) => (prevIndex + 1) % highlightedWords.length
      );
    }, 2500); // Change word every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  // Modal Handlers
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  // Carousel Handlers
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % servicesData.length);
  };
  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + servicesData.length) % servicesData.length
    );
  };

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

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") handleCloseModal();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, []);

  return (
    <div>
      <header className={`top-nav ${isScrolled ? "fixed-header" : ""}`}>
        <a href="#home" className="brand-logo-text" onClick={handleLinkClick}>
          PyroSynergy
        </a>
        <nav ref={navRef} className="main-navigation">
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            {/* <li>
              <a href="#services">Services</a>
            </li> */}
            <li>
              <a href="#contact">Contact</a>
            </li>
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
              <li>
                <a href="#home" onClick={handleLinkClick}>
                  Home
                </a>
              </li>
              {/* <li>
                <a href="#services" onClick={handleLinkClick}>
                  Services
                </a>
              </li> */}
              <li>
                <a href="#contact" onClick={handleLinkClick}>
                  Contact
                </a>
              </li>
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
          {/* MODIFIED MARQUEE SECTION START */}
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
          {/* MODIFIED MARQUEE SECTION END */}
        </div>
      </section>

      {/* <section id="services" className="services-section">
        <div className="section-heading">
          <h2 className="services-title">Our Capabilities</h2>
          <p className="services-subtitle">
            We turn ambitious ideas into intelligent, scalable, and beautiful
            digital solutions.
          </p>
        </div>
        <div className="services-container">
          <div
            className="services-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {servicesData.map((service, index) => (
              <div
                className={`service-card-wrapper ${
                  index === currentSlide ? "active" : ""
                }`}
                key={index}
              >
                <div
                  className="service-card-border-wrap"
                  onClick={() => handleOpenModal(service)}
                >
                  <div className="service-card">
                    <div className="service-card-icon-wrapper">
                      <FontAwesomeIcon
                        icon={service.icon}
                        className="service-card-icon"
                      />
                    </div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.shortDesc}</p>
                    <span className="know-more-btn">
                      Know More <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-nav">
          <button
            onClick={handlePrevSlide}
            className="carousel-arrow"
            aria-label="Previous service"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="carousel-dots">
            {servicesData.map((_, index) => (
              <span
                key={index}
                className={`carousel-dot ${
                  currentSlide === index ? "active" : ""
                }`}
                onClick={() => setCurrentSlide(index)}
              ></span>
            ))}
          </div>
          <button
            onClick={handleNextSlide}
            className="carousel-arrow"
            aria-label="Next service"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section> */}

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

      {isModalOpen && selectedService && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2 className="modal-title">{selectedService.details.heading}</h2>
            <ul className="modal-points">
              {selectedService.details.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            <button className="modal-cta-btn" onClick={openCalendarPopup}>
              Book a Discovery Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;