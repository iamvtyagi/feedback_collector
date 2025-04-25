const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @route   POST /api/feedback
// @desc    Submit new feedback
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    // Create new feedback
    const feedback = new Feedback({
      name,
      email,
      message
    });
    
    // Save to database
    await feedback.save();
    
    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback entries
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    // Get all feedbacks in reverse chronological order
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
