import React from 'react';
import './Contact.css';

const Contact = ({ 
  email, 
  setEmail, 
  message, 
  setMessage, 
  formStatus, 
  handleFormSubmit 
}) => {
  return (
    <section id="contact" className="form-section">
      <div className="form-text-wrapper">
        <p className="form-intro">
          Let's be clear and honest: Your business NEEDS a{" "}
          <span className="personalized-highlight">personalized</span>{" "}
          solution.
        </p>
        <p className="form-desc">
          Let's keep this organic and deliver EXACTLY what you're looking for.
          Drop in your email, and let's discuss this together.
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
  );
};

export default Contact;