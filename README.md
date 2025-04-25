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
3. Configure environment variables:
   - Backend: Update the MongoDB connection string in `server/.env` if needed
   - Frontend: Configure API URL in `client/.env.development` and `client/.env.production`

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

- `POST /submit-feedback` - Submit new feedback
- `GET /feedbacks` - Get all feedback entries

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback_collector
NODE_ENV=development
```

### Frontend (.env, .env.development, .env.production)
```
# Development
VITE_API_BASE_URL=http://localhost:5000

# Production - leave empty to use same origin
VITE_API_BASE_URL=
```

## Deployment

### Backend Deployment
1. Set up a MongoDB Atlas database
2. Deploy the server to a hosting service (Heroku, Render, etc.)
3. Set the following environment variables:
   - `PORT`: The port to run the server on (often set by the hosting service)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: Set to "production"

### Frontend Deployment
1. Build the frontend:
   ```
   cd client
   npm run build
   ```
2. Deploy the built files to a static hosting service (Vercel, Netlify, etc.)
3. For same-origin deployment (backend and frontend on same domain):
   - Leave `VITE_API_BASE_URL` empty in .env.production
4. For separate deployments:
   - Set `VITE_API_BASE_URL` to your backend URL in .env.production
   - Add your frontend URL to the `allowedOrigins` array in the server's CORS configuration

## Built by Vansh Tyagi
