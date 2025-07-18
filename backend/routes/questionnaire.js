const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');

// @route   POST /api/questionnaire/submit
// @desc    Submit questionnaire response
// @access  Public
router.post('/submit', async (req, res) => {
  try {
    const {
      businessStage,
      businessStageOther,
      businessChallenge,
      revenueSatisfaction,
      successVision,
      hiringConcern,
      hiringConcernOther,
      visionAlignment,
      onepartnerAppeal,
      improvementTimeline,
      email,
      mcqScore,
      mcqMaxScore,
      mcqPercentage,
      scoreBand,
      scoreLabel
    } = req.body;

    // Basic validation
    if (!businessStage || !businessChallenge || !revenueSatisfaction || 
        !successVision || !hiringConcern || !visionAlignment || 
        !onepartnerAppeal || !improvementTimeline || !email) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Get client IP
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

    // Create new questionnaire response with scoring data
    const questionnaireResponse = new Questionnaire({
      businessStage,
      businessStageOther,
      businessChallenge,
      revenueSatisfaction,
      successVision,
      hiringConcern,
      hiringConcernOther,
      visionAlignment,
      onepartnerAppeal,
      improvementTimeline,
      email,
      mcqScore: mcqScore || 0,
      mcqMaxScore: mcqMaxScore || 0,
      mcqPercentage: mcqPercentage || 0,
      scoreBand: scoreBand || 'red',
      scoreLabel: scoreLabel || '',
      ipAddress
    });

    // Save to database
    await questionnaireResponse.save();

    res.status(201).json({
      success: true,
      message: 'Questionnaire submitted successfully',
      data: {
        id: questionnaireResponse._id,
        submittedAt: questionnaireResponse.submittedAt,
        score: {
          mcqScore: questionnaireResponse.mcqScore,
          mcqPercentage: questionnaireResponse.mcqPercentage,
          scoreBand: questionnaireResponse.scoreBand,
          scoreLabel: questionnaireResponse.scoreLabel
        }
      }
    });

  } catch (error) {
    console.error('Error submitting questionnaire:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email has already been used for a submission'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @route   GET /api/questionnaire/responses
// @desc    Get all questionnaire responses (for admin)
// @access  Public (you can add auth later)
router.get('/responses', async (req, res) => {
  try {
    const responses = await Questionnaire.find()
      .sort({ submittedAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;