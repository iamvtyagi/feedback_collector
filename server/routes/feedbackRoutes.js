const Feedback = require("../models/Feedback");

/**
 * @route   POST /submit-feedback
 * @desc    Submit new feedback
 * @access  Public
 */
const submitFeedback = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Create new feedback
    const feedback = new Feedback({
      name,
      email,
      message,
    });

    // Save to database
    await feedback.save();

    res.status(201).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /feedbacks
 * @desc    Get all feedback entries
 * @access  Public
 */
const getAllFeedbacks = async (req, res, next) => {
  try {
    // Get all feedbacks in reverse chronological order
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbacks,
};
