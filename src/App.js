import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Component imports
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// Third-party Libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faPalette,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

// Asset Imports
import logo1 from "./assets/viali.png";
import logo3 from "./assets/mih.png";
import logo5 from "./assets/riMLand.png";
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/innogeeks.png";
import logo10 from "./assets/acm.png";

// --- UPDATED Data for Services Section (Based on sketches) ---
const servicesData = [
  {
    icon: <FontAwesomeIcon icon={faCode} />, // Icon for "bring it online"
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
    icon: <FontAwesomeIcon icon={faPalette} />, // Icon for "reaching the right audience"
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
    icon: <FontAwesomeIcon icon={faRobot} />, // Icon for "scale without burnout"
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

  return (
    <div>
      <Header 
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navRef={navRef}
        handleLinkClick={handleLinkClick}
      />

      <Hero 
        highlightedWords={highlightedWords}
        highlightedIndex={highlightedIndex}
        clientLogos={clientLogos}
        openCalendarPopup={openCalendarPopup}
      />

      <Services 
        servicesData={servicesData}
        expandedCardIndex={expandedCardIndex}
        closingCardIndex={closingCardIndex}
        handleCardClick={handleCardClick}
        handleCloseCard={handleCloseCard}
        openCalendarPopup={openCalendarPopup}
      />

      <Contact 
        email={email}
        setEmail={setEmail}
        message={message}
        setMessage={setMessage}
        formStatus={formStatus}
        handleFormSubmit={handleFormSubmit}
      />

      <Footer />
    </div>
  );
}

export default App;