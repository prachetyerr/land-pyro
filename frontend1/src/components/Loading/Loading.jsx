import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div id="loading">
      <div className="logo-container">
        <img 
          src="/Mainlogo3.png" 
          alt="PyroSynergy Logo" 
          className="loading-logo"
        />
        <div className="logo-glow"></div>
      </div>
      <div className="loading-text">
        <span className="company-name">PyroSynergy</span>
        <span className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    </div>
  );
};

export default Loading;