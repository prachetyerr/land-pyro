import React, { useState } from 'react';
import './Questionnaire.css';

// ThemeAlert component is unchanged
const ThemeAlert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p className="alert-message">{message}</p>
        <button onClick={onClose} className="alert-close-button">
          OK
        </button>
      </div>
    </div>
  );
};

const Questionnaire = () => {
  // MODIFIED: Start at step -1 to show the welcome screen first.
  const [currentStep, setCurrentStep] = useState(-1);
  
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    businessStage: '',
    businessStageOther: '',
    businessChallenge: '',
    revenueSatisfaction: '',
    successVision: '',
    hiringConcern: '',
    hiringConcernOther: '',
    visionAlignment: '',
    fixOneThing: '',
    advisorComfort: '',
    onepartnerAppeal: '',
    improvementTimeline: '',
    email: ''
  });

  const questions = [
    {
      id: 'businessStage',
      type: 'button-select',
      question: 'What stage best describes your business?',
      required: true,
      options: [
        { value: 'just-starting', label: 'Just starting out (0-6 months)' },
        { value: 'established-offline', label: 'Established offline, exploring online' },
        { value: 'online-struggling', label: 'Online but struggling with growth' },
        { value: 'growing-well', label: 'Growing well, seeking optimization' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'businessChallenge',
      type: 'text',
      question: 'What\'s your #1 business challenge right now?',
      placeholder: 'e.g., \'Not enough customers\', \'Too many manual processes\'',
      required: true
    },
    {
      id: 'revenueSatisfaction',
      type: 'scale',
      question: 'How satisfied are you with your current monthly revenue?',
      required: true,
      scaleLabels: {
        1: 'Very unsatisfied',
        5: 'Very satisfied'
      }
    },
    {
      id: 'successVision',
      type: 'text',
      question: 'What would a successful next 12 months look like for you?',
      placeholder: 'e.g., \'Double my customer base\', \'Streamline operations\'',
      required: true
    },
    {
      id: 'hiringConcern',
      type: 'button-select',
      question: 'What\'s your biggest concern about seeking outside help?',
      required: true,
      options: [
        { value: 'cost-budget', label: 'Cost/budget constraints' },
        { value: 'not-sure-needs', label: 'Not sure what I actually need' },
        { value: 'quality-results', label: 'Worried about quality/results' },
        { value: 'trust-communication', label: 'Trust and communication issues' },
        { value: 'no-concerns', label: 'No major concerns' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      id: 'visionAlignment',
      type: 'button-select',
      question: 'Does your current business operations match your original vision?',
      required: true,
      options: [
        { value: 'mostly-aligned', label: 'Yes, mostly aligned' },
        { value: 'somewhat-aligned', label: 'Somewhat aligned' },
        { value: 'not-really', label: 'Not really aligned' },
        { value: 'completely-different', label: 'Completely different from vision' }
      ]
    },
    
    {
      id: 'onepartnerAppeal',
      type: 'button-select',
      question: 'How appealing is having one partner handle multiple business needs?',
      required: true,
      options: [
        { value: 'very-appealing', label: 'Very appealing - I prefer one-stop solutions' },
        { value: 'somewhat-appealing', label: 'Somewhat appealing - depends on the needs' },
        { value: 'not-appealing', label: 'Not appealing - I prefer specialists' },
        { value: 'unsure', label: 'Unsure' }
      ]
    },
    {
      id: 'improvementTimeline',
      type: 'button-select',
      question: 'When do you want to start making improvements?',
      required: true,
      options: [
        { value: 'right-away', label: 'Right away (within 1 month)' },
        { value: 'soon', label: 'Soon (1-3 months)' },
        { value: 'later-this-year', label: 'Later this year (3-6 months)' },
        { value: 'next-year', label: 'Next year or later' },
        { value: 'just-exploring', label: 'Just exploring options' }
      ]
    },
    {
      id: 'email',
      type: 'email',
      question: 'What\'s the best email to send your personalized business insights?',
      placeholder: 'Enter your email address',
      required: true
    }
  ];

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;

  const handleInputChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleOtherTextChange = (value) => {
    const otherFieldId = currentQuestion.id + 'Other';
    setFormData(prev => ({
      ...prev,
      [otherFieldId]: value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    const currentValue = formData[currentQuestion.id];
    
    if (currentQuestion.required && !currentValue) {
      setAlertMessage("Please answer this question.");
      setIsAlertVisible(true);
      return;
    }

    if (currentValue === 'other') {
      const otherFieldId = currentQuestion.id + 'Other';
      const otherValue = formData[otherFieldId];
      if (!otherValue || otherValue.trim() === '') {
        setAlertMessage('Please specify your answer for "Other".');
        setIsAlertVisible(true);
        return;
      }
    }

    if (isLastStep) {
      console.log('Form submitted:', formData);
      setAlertMessage("Thank you! Your questionnaire has been submitted. We'll get back to you soon.");
      setIsAlertVisible(true);
      // Reset form
      setFormData({
        businessStage: '',
        businessStageOther: '',
        businessChallenge: '',
        revenueSatisfaction: '',
        successVision: '',
        hiringConcern: '',
        hiringConcernOther: '',
        visionAlignment: '',
        fixOneThing: '',
        advisorComfort: '',
        onepartnerAppeal: '',
        improvementTimeline: '',
        email: ''
      });
      // MODIFIED: Return to welcome screen after submission
      setCurrentStep(-1);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // THIS FUNCTION'S FORMATTING IS NOW PRESERVED
  const renderInput = () => {
    const value = formData[currentQuestion.id] || '';

    switch (currentQuestion.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="question-input"
            autoFocus
          />
        );
      
      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="question-input"
            autoFocus
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className="question-select"
            autoFocus
          >
            {currentQuestion.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'button-select':
        const hasOtherOption = currentQuestion.options.some(option => option.value === 'other');
        const showOtherInput = hasOtherOption && value === 'other';
        const otherFieldId = currentQuestion.id + 'Other';
        
        return (
          <div className="button-select-container">
            <div className="button-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleInputChange(option.value)}
                  className={`option-button ${value === option.value ? 'selected' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            
            {showOtherInput && (
              <div className="other-input-container">
                <input
                  type="text"
                  value={formData[otherFieldId] || ''}
                  onChange={(e) => handleOtherTextChange(e.target.value)}
                  placeholder="Please specify..."
                  className="other-input"
                  autoFocus
                />
              </div>
            )}
          </div>
        );
      
      case 'scale':
        return (
          <div className="scale-container">
            <div className="scale-labels">
              <span className="scale-label-left">{currentQuestion.scaleLabels[1]}</span>
              <span className="scale-label-right">{currentQuestion.scaleLabels[5]}</span>
            </div>
            <div className="scale-options">
              {[1, 2, 3, 4, 5].map((scaleValue) => (
                <label key={scaleValue} className="scale-option">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={scaleValue}
                    checked={value == scaleValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  <span className="scale-number">{scaleValue}</span>
                </label>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section id="questionnaire" className="questionnaire-section">
      {isAlertVisible && <ThemeAlert message={alertMessage} onClose={() => setIsAlertVisible(false)} />}
      
      <div className="questionnaire-container">
        {/* ADDED: Conditional logic for welcome screen */}
        {currentStep === -1 ? (
          <div className="welcome-container">
            <h1 className="welcome-title">Welcome to the PyroReality Check!</h1>
            <p className="welcome-description">
              This quick 3-minute check-up helps us understand your business. Be honest—your answers provide the insights we need to tailor the perfect growth strategy for you.
            </p>
            <button
              onClick={() => setCurrentStep(0)}
              className="start-button"
            >
              Let's Begin
            </button>
          </div>
        ) : (
          // The existing content is wrapped in a React Fragment
          <>
            <div className="progress-container">
              
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              
              {/* Only show progress text if it's not the last step */}
              {!isLastStep && (
                <span className="progress-text">
                  Question {currentStep + 1} of {questions.length - 1}
                </span>
              )}
            </div>

            <div className="questionnaire-header">
              <h1 className="questionnaire-title">
                {currentQuestion.question}
              </h1>
            </div>

            <form className="questionnaire-form" onSubmit={handleNext}>
              <div className="question-container">
                {renderInput()}
              </div>

              <div className="navigation-buttons">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="nav-button prev-button"
                  >
                    ← Previous
                  </button>
                )}
                
                <button
                  type="submit"
                  className="nav-button next-button"
                >
                  {isLastStep ? 'Submit' : 'Next →'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default Questionnaire;