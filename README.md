# Feedback Collector App

A single-page feedback collector application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Feedback Submission Form**:
  - Full Name (text input)
  - Email (with validation)
  - Feedback Message (text area)
  - Submit button with loading state

- **Admin View**:
  - Toggle button to view submitted feedback
  - Displays all feedback entries in a card layout
  - Shows name, email, message, and timestamp for each entry

- **Bonus Features**:
  - Mobile responsive design
  - Dark/light theme toggle
  - Timestamp for each submission
  - Form validation with user-friendly messages
  - Smooth animations and transitions using GSAP

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for styling
- GSAP for animations
- React Toastify for notifications

### Backend
- Node.js + Express
- MongoDB for data storage
- Mongoose for MongoDB object modeling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm run install-deps
   ```
3. Configure MongoDB:
   - Update the MongoDB connection string in `server/.env` if needed

### Running the Application

To run both the client and server concurrently:

```
npm start
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

## Project Structure

```
feedback_collector/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   └── package.json        # Frontend dependencies
├── server/                 # Backend Express application
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
└── package.json            # Root package.json for running both client and server
```

## API Endpoints

- `POST /api/submit-feedback` - Submit new feedback
- `GET /api/feedbacks` - Get all feedback entries

## Built by Vansh Tyagi
