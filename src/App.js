// --- START OF FILE App.js ---

import React, { useState, useEffect } from 'react';
import './App.css';
import Marquee from 'react-fast-marquee';
import grids from './Frame 41.png'; // Assuming this is your correct SVG file
import lines from './Frame 15 (1).svg'; // Assuming this is your correct SVG file
import logo1 from './viali.png';
import logo2 from './tanvi.png';
import logo3 from './mih.png';
import logo4 from './grind time rides.png';
import logo5 from './riMLand.png';
import logo6 from './yourbest.png';
import logo7 from './gro vnr.png';
import logo8 from './nasa.png';
import logo9 from './innogeeks.png';
import logo10 from './acm.png';

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


function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
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
          <div
            className="flex flex-col items-center justify-center flex-1"
            style={{ minHeight: '40vh', paddingTop: '130px', paddingBottom: '40px' }}
          >
            <h1 className="hero-heading leading-snug">
              <div>Let's make your business</div>
              <div className="highlighted">AI-ready.</div>
            </h1>
            <p className="hero-desc">
              From strategy to scale, we rebuild and redesign your brand into its most{' '}
              <span className="desc-highlight">efficient, effective, and elegant</span> form—
              empowering you to <span className="desc-italic">outgrow</span> your competitors in
              sales and success.
            </p>
            <button className="hero-button mx-auto">
              schedule a <span className="free-highlight">FREE</span> strategy call
            </button>
          </div>

          {/* Decorative SVG - Positioned behind Marquee */}
          <div 
            className="absolute bottom-4 w-full" 
            style={{ zIndex: 10 }} // Lower z-index
          >
            <img
              src={lines}
              alt="Decorative SVG"
              className="h-16 object-cover block mx-auto"
              style={{ width: '1900px', maxWidth: '100%' }}
            />
          </div>

          {/* Marquee Logos - Positioned to overlap SVG */}
          <div 
            className="absolute bottom-6 w-full py-2" // Positioned to overlap
            style={{ zIndex: 20 }} // Higher z-index
          > 
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
        </section> {/* End of Hero Section */}

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
          {/* SVG at the bottom of the form-section */}
          <img
            src={grids}
            alt="Decorative SVG"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translateX(-50%)',
              width: '1000px',
              height: '200px',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none'
            }}
          />
        </section>





        {/* Footer */}
        <footer className="footer">
          <span className="brand-logo-text">Pyrosynergy</span>
          <div className="social-icons">
            <a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#"><img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" /></a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

// --- END OF FILE App.js ---