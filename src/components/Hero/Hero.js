import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";
import './Hero.css';
import bgvideo from "../../assets/bgvideo.mp4";

const Hero = ({ highlightedWords, highlightedIndex, clientLogos, openCalendarPopup, handleNavigateToQuestionnaire }) => {
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);

  // Carousel effect for buttons on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentButtonIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 3000); // Change button every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
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
            paddingBottom: "0px",
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
          <div className="hero-buttons-container">
            <button
              className={`hero-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 0 ? 'button-active' : 'button-inactive'
              }`}
              onClick={openCalendarPopup}
            >
              schedule a <span className="free-highlight">FREE</span> strategy
              call
            </button>
            <button
              className={`hero-button questionnaire-button mx-auto mt-4 mb-8 md:mb-12 ${
                currentButtonIndex === 1 ? 'button-active' : 'button-inactive'
              }`}
              onClick={handleNavigateToQuestionnaire}
            >
              take our <span className="free-highlight">QUICK</span> questionnaire
            </button>
          </div>
        </div>
        <div className="marquee-outer-padding-container ">
          <div className="marquee-inner-content-container hero-marquee">
            <Marquee speed={100} pauseOnHover={false} gradient={false} pauseOnClick={false}>
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
  );
};

export default Hero;