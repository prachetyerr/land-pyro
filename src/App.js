// --- START OF FILE App.js ---

import React, { useState, useEffect } from 'react';
import './App.css'; // Assuming App.css is in the same directory or src/
import Marquee from 'react-fast-marquee';
import grids from './assets/Frame 41.png'; // Assuming this is your correct SVG file
import lines from './assets/Frame 15.1.svg'; // Assuming this is your correct SVG file
import logo1 from './assets/viali.png';
import logo2 from './assets/tanvi.png';
import logo3 from './assets/mih.png';
import logo4 from './assets/grind time rides.png';
import logo5 from './assets/riMLand.png';
import logo6 from './assets/yourbest.png';
import logo7 from './assets/gro vnr.png';
import logo8 from './assets/nasa.png';
import logo9 from './assets/innogeeks.png';
import logo10 from './assets/acm.png';
import bgvideo from './assets/bgvideo.mp4';

const clientLogos = [
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
];

// Define the Switcher12 component (modified to be controlled)
const Switcher12 = ({ isChecked, onChange }) => {
  const handleCheckboxChange = () => {
    if (onChange) {
      onChange(!isChecked); // Notify parent component of the change
    }
  };

  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        <span className='label flex items-center text-sm font-medium'>
          Light
        </span>
        <span
          className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-[#212b36]' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
        <span className='label flex items-center text-sm font-medium'>
          Dark
        </span>
      </label>
    </>
  );
};

const openCalendarPopup = () => {
    const calendarUrl = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0iZ6GBUpEp6xEXcYQ0wZLryUc6bprkId2iHVJjJF88E3JTJGM917FiwtH6mwtuwUuyOVr2Whwm?gv=true'; // <-- IMPORTANT: REPLACE THIS URL
    const popupFeatures = 'width=1000,height=700,scrollbars=yes,resizable=yes';
    window.open(calendarUrl, 'googleCalendarPopup', popupFeatures);
  };

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.documentElement.classList.add('dark'); // For Tailwind 'class' strategy
    } else {
      document.body.classList.remove('dark');
      document.documentElement.classList.remove('dark'); // For Tailwind 'class' strategy
    }
  }, [isDark]);

  return (
    // Tailwind dark mode is often applied to <html>, so ensure documentElement gets the class.
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative flex flex-col min-h-screen p-6"> {/* Parent with position: relative */}
          {/* Top Bar */}
          <div className="top-nav">
            <span className="brand-logo-text">Pyrosynergy</span>
            <Switcher12
              isChecked={isDark}
              onChange={setIsDark}
            />
          </div>

          {/* Centered Content */}
        <div className="content-video-wrapper">

  {/* Video Background: now uses a CSS class */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="content-video-bg" // Class for video styling
  >
    <source src={bgvideo} type="video/mp4" /> {/* Ensure path is correct */}
    Your browser does not support the video tag.
  </video>

  {/* Overlay for fading: now uses a CSS class */}
  <div className="content-video-fade-overlay"></div>

  {/* Inner content div: existing classes + new class for layering + remaining layout styles */}
  <div
    className="flex flex-col items-center justify-center flex-1 content-on-top" // Added 'content-on-top'
    style={{
      // position & zIndex are now handled by 'content-on-top' class
      minHeight: '40vh',    // Specific layout style for this content block
      paddingTop: '130px',  // Specific layout style for this content block
      paddingBottom: '40px' // Specific layout style for this content block
    }}
  >
    <h1 className="hero-heading leading-snug">
      <div>Let's make your business</div>
      <div className="highlighted">AI-ready.</div>
    </h1>
    <p className="hero-desc">
      From strategy to scale, we rebuild and redesign your brand into its most{' '}
      <span className="desc-highlight">efficient, effective, and elegant</span> form —
      empowering you to <span className="desc-italic">outgrow</span> your competitors in
      sales and success.
    </p>

    <button className="hero-button mx-auto mb-8 md:mb-12" onClick={openCalendarPopup}>
      schedule a <span className="free-highlight">FREE</span> strategy call
    </button>
          </div> 

            {/* Marquee Logos - Now after the button */}
            <div className="w-full max-w-4xl py-2"> {/* Removed top margin as button now has bottom margin */}
              <Marquee speed={40} pauseOnHover gradient={false}>
                {clientLogos.map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`client-${idx}`}
                    style={{
                      height: '35px',
                      marginLeft: '2.5rem',
                      marginRight: '2.5rem',
                    }}
                  />
                ))}
              </Marquee>
            </div>
          </div>

          {/* Decorative SVG - Remains at the bottom of the section */}
          <div
            className="absolute bottom-4 w-full"
            style={{ zIndex: 1 }}
          >
            {/* <img
              src={lines}
              alt="Decorative lines"
              className="h-16 object-cover block mx-auto"
              style={{ width: '1900px', maxWidth: '100%' }}
            /> */}
          </div>
        </section> {/* End of Hero Section */}

        <div className="hero-bottom-gradient-band"></div>

        <section className="form-section" style={{ position: 'relative', overflow: 'hidden' }}>
          <div>
            <p className="form-intro">
              Let’s be clear and honest: Your business NEEDS a{" "}
              <span className="personalized-highlight">personalized</span> solution.
            </p>
            <p className="form-desc">
              Let’s keep this organic and deliver EXACTLY what you’re looking for. Drop in your email, and let’s discuss this together.
            </p>
          </div>
          <div className="form-container">
            <form className="form">
              <textarea name="message" placeholder="Enter your message" rows="4" />
              <div className="horizontal-group">
                <div className="email-field">
                  <input type="email" name="email" placeholder="Enter your email" />
                </div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <img
            src={grids}
            alt="Decorative grids"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              width: '1000px',
              height: '200px',
              zIndex: 0,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-names">
            <span className="brand-logo-text">Pyrosynergy</span>
            <span className="brand-copyright-text"> &copy; Copyright 2025 Pyrosynergy AI Labs. All rights reserved.</span>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#" aria-label="LinkedIn"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" /></a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

// --- END OF FILE App.js ---
