import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  
  const links = [
    {
      title: 'Website',
      description: 'Visit our main website',
      icon: '🌐',
      url: '/',
      isExternal: false
    },
    {
      title: 'Reality Check',
      description: 'Take our business questionnaire',
      icon: '📋',
      url: '/realitycheck',
      isExternal: false
    },
    {
      title: 'Book a Call',
      description: 'Schedule a consultation',
      icon: '📞',
      url: '#', // Replace with actual calendar link
      isExternal: true
    },
    {
      title: 'Instagram',
      description: 'Follow us on Instagram',
      icon: '📸',
      url: '#', // Replace with Instagram link
      isExternal: true
    },
    {
      title: 'LinkedIn',
      description: 'Connect with us professionally',
      icon: '💼',
      url: '#', // Replace with LinkedIn link
      isExternal: true
    }
  ];

  const handleLinkClick = (link) => {
    if (link.isExternal) {
      window.open(link.url, '_blank', 'noopener,noreferrer');
    } else {
      // Use navigate instead of window.location.href to avoid page reload
      navigate(link.url);
    }
  };

  return (
    <div className="pyro-landing-wrapper">
      <div className="pyro-landing-main">
        {/* Profile Section */}
        <div className="pyro-company-info">
          <div className="pyro-logo-container">
            <img 
              src="/Mainlogo3.png" 
              alt="PyroSynergy Logo" 
              className="pyro-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="pyro-logo-fallback" style={{display: 'none'}}>PS</div>
          </div>
          <h1 className="pyro-company-title">PyroSynergy</h1>
          <p className="pyro-company-tagline">
            Business Growth • Digital Transformation • Strategy Consulting
          </p>
          <p className="pyro-company-description">
            Empowering businesses to scale and transform in the digital era
          </p>
        </div>

        {/* Links Section */}
        <div className="pyro-navigation-menu">
          {links.map((link, index) => (
            <button
              key={index}
              className="pyro-nav-item"
              onClick={() => handleLinkClick(link)}
            >
              <div className="pyro-nav-content">
                <div className="pyro-nav-icon">{link.icon}</div>
                <div className="pyro-nav-text">
                  <h3 className="pyro-nav-title">{link.title}</h3>
                  <p className="pyro-nav-subtitle">{link.description}</p>
                </div>
              </div>
              <div className="pyro-nav-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
