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
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-avatar">
            <img 
              src="/Mainlogo3.png" 
              alt="PyroSynergy Logo" 
              className="logo-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="logo-placeholder" style={{display: 'none'}}>PS</div>
          </div>
          <h1 className="profile-name">PyroSynergy</h1>
          <p className="profile-subtitle">
            Business Growth • Digital Transformation • Strategy Consulting
          </p>
          <p className="profile-description">
            Empowering businesses to scale and transform in the digital era
          </p>
        </div>

        {/* Links Section */}
        <div className="links-section">
          {links.map((link, index) => (
            <button
              key={index}
              className="link-button"
              onClick={() => handleLinkClick(link)}
            >
              <div className="link-content">
                <div className="link-icon">{link.icon}</div>
                <div className="link-text">
                  <h3 className="link-title">{link.title}</h3>
                  <p className="link-description">{link.description}</p>
                </div>
              </div>
              <div className="link-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
