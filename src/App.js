import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Component imports
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Loading from "./components/Loading/Loading"; // Add this import


// Asset Imports
import logo1 from "./assets/viali.png";
import logo3 from "./assets/mih.png";
import logo5 from "./assets/riMLand.png";
import logo7 from "./assets/gro vnr.png";
import logo8 from "./assets/nasa.png";
import logo9 from "./assets/recens_logo.png";
import logo10 from "./assets/acm.png";
import service1 from './assets/Thinking face-rafiki.svg';
import service3 from './assets/13107135_5143310.svg';
import service2 from './assets/Kids Studying from Home-rafiki.svg'
// --- UPDATED Data for Services Section (Based on sketches) ---
const servicesData = [
  {
    title: '"My business is solid. Now I want to bring it online."',
    shortStatement:
      "Isn't this the best time to turn your offline hustle into a digital experience?",
     
    ctaText: "Let's go ",
    Image: service1, // Added image for visual context
  },
  {
    title:
      '"I\'m up and running online, but I\'m not reaching the right audience."',
    shortStatement:
      "Your products is great, no doubt. But have you positioned it right?",
   
    ctaText: "Let's grow ",
    Image: service2, // Added image for visual context
  },
  {
    title:
      '"My company is picking up, and I want to scale without the burnout."',
    shortStatement:
      "You've figured out the fundamentals. How about streaming your operations?",
    ctaText: "Let's optimize ", // Slightly adjusted CTA for clarity
    Image: service3, // Added image for visual context
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
  const [currentPage, setCurrentPage] = useState('home'); // Add this state
  const [isLoading, setIsLoading] = useState(true); // Add loading state

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

  // Add loading effect
  useEffect(() => {
    // Simulate loading time - adjust as needed
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // Reduced from probably 3000-5000ms to 1000ms (1 second)

    // Cleanup
    return () => clearTimeout(loadingTimer);
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
    // Lock body scroll when loading or when a card is expanded on mobile
    if (isLoading || (expandedCardIndex !== null && isMobile)) {
      document.body.style.overflow = "hidden";
    } else {
      // Otherwise, ensure it's unlocked
      document.body.style.overflow = "auto";
    }
    // Cleanup function to ensure scroll is always restored on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expandedCardIndex, isLoading]); // Add isLoading to dependencies
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

  // Add navigation handler
  const handleNavigateToQuestionnaire = () => {
    setCurrentPage('questionnaire');
  };

  const handleNavigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {/* Loading Screen */}
      {isLoading && <Loading />}
      
      {/* Main Content */}
      <div className={isLoading ? 'main-content-hidden' : 'main-content-visible'}>
        <Header 
          isScrolled={isScrolled}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navRef={navRef}
          handleLinkClick={handleLinkClick}
          currentPage={currentPage} // Add this line
          handleNavigateToHome={handleNavigateToHome} // Add this line
        />
        {currentPage === 'questionnaire' ? (
          <Questionnaire />
        ) : (
          <>
            <Hero 
              highlightedWords={highlightedWords}
              highlightedIndex={highlightedIndex}
              clientLogos={clientLogos}
              openCalendarPopup={openCalendarPopup}
              handleNavigateToQuestionnaire={handleNavigateToQuestionnaire}
            />

            <Services 
              servicesData={servicesData}
              expandedCardIndex={expandedCardIndex}
              closingCardIndex={closingCardIndex} // Add this line
              handleCardClick={handleCardClick} // Add this line
              handleCloseCard={handleCloseCard} // Add this line
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;