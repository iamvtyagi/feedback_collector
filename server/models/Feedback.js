const mongoose = require('mongoose');

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  message: {
    type: String,
    required: [true, 'Feedback message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
