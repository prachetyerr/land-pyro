import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import './Services.css'; // Your CSS file

const Services = ({ 
  servicesData,
  expandedCardIndex,
  closingCardIndex,
  handleCardClick,
  handleCloseCard,
  openCalendarPopup
}) => {
  const handleCalendarButtonClick = (e) => {
    e.stopPropagation();
    openCalendarPopup();
  };

  return (
    <section id="services" className="services-section">
      <div className="section-heading">
        <h2 className="services-title">Our Capabilities</h2>
        <p className="services-subtitle">
          We turn ambitious ideas into intelligent, scalable, and beautiful
          digital solutions.
        </p>
      </div>

      <div className="services-interactive-container">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`service-card-wrapper ${
              expandedCardIndex !== null
                ? expandedCardIndex === index
                  ? "expanded"
                  : "overlay"
                : ""
            } ${closingCardIndex === index ? 'closing-instant' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="service-card-interactive" onClick={(e) => { if (expandedCardIndex === index) e.stopPropagation() }}>
              <div className="service-card-interactive-content">
                {/* ========== Content for Collapsed Card (Unchanged) ========== */}
                <div className="card-content-initial">
                  <div className="card-image-initial">
                    <img src={service.Image} alt="" />
                  </div>
                  <h3 className="service-card-title-quote">
                    {service.title}
                  </h3>
                  <div className="card-buttons-initial">
                    <button
                      className="card-cta-initial"
                      onClick={handleCalendarButtonClick}
                    >
                      {service.ctaText}
                    </button>
                    <button
                      className="know-more-btn"
                      onClick={(e) => { e.stopPropagation(); handleCardClick(index); }}
                    >
                      Know More
                    </button>
                  </div>
                </div>

                {/* ========== CORRECTED: Content for Expanded Card ========== */}
                <div className="card-content-expanded">
                  <h2 className="modal-title">{service.title}</h2>
                  
                  {/* New container for the main 2-column content */}
                  <div className="modal-main-content">
                    {/* Left Column (Text) */}
                    <div className="modal-text-content">
                      <p className="modal-statement">{service.shortStatement}</p>
                      <div className="modal-outcome">
                        {service.outcome.map((point, idx) => (
                          <p key={idx} className="outcome-point">{point}</p>
                        ))}
                      </div>
                    </div>

                    {/* Right Column (Image) */}
                    <div className="modal-image-container">
                      <img src={service.Image} alt={service.title} className="modal-image" />
                    </div>
                  </div>

                  <button
                    className="modal-cta-btn"
                    onClick={openCalendarPopup}
                  >
                    {service.ctaText}
                  </button>
                </div>
              </div>

              <button
                className="card-close-btn"
                onClick={handleCloseCard}
                aria-label="Close details"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;