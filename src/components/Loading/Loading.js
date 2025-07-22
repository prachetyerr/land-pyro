import React from 'react';
import './Loading.css';

const Loading = () => {
  const text = "PyroSynergy";
  
  return (
    <div id="loading">
      <h3>
        {text.split('').map((char, index) => (
          <span key={index} style={{ '--i': index + 1 }}>
            {char}
          </span>
        ))}
      </h3>
    </div>
  );
};

export default Loading;