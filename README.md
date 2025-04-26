# 🚀 Feedback Collector | Next-Gen MERN Application

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</div>

<div align="center">
  <h3>🌟 A revolutionary feedback collection platform with a stunning UI</h3>
  <p>Live Demo: <a href="https://feedback-collector-inky.vercel.app/">https://feedback-collector-inky.vercel.app/</a> | <a href="https://vicharaapka.netlify.app/">https://vicharaapka.netlify.app/</a></p>
</div>

<p align="center">
  <img src="https://i.imgur.com/XYBnJwP.png" alt="Feedback Collector Screenshot" width="80%" />
</p>

## 📋 Overview

A cutting-edge feedback collection application built with the MERN stack (MongoDB, Express, React, Node.js). This application features a stunning UI with glassmorphism effects, animated gradients, and interactive elements that create an engaging user experience. Designed to collect, store, and display user feedback with enterprise-grade reliability and a consumer-grade interface.

## ✨ Key Features

### 🎨 Stunning Visual Design
- **Glassmorphism UI**: Modern frosted glass components with depth and dimension
- **Animated Gradients**: Dynamic color transitions for headings and interactive elements
- **Glow Effects**: Subtle lighting effects that respond to user interactions
- **Dark/Light Theme**: Elegant theme switching with smooth transitions
- **Micro-interactions**: Subtle animations that provide visual feedback

### 📝 Interactive Feedback Form
- **Smart Validation**: Real-time form validation with helpful error messages
- **Animated Fields**: Form fields that respond to focus and input
- **Loading States**: Visual feedback during submission process
- **Success Animation**: Engaging confirmation experience
- **Error Handling**: User-friendly error messages with recovery options

### 👨‍💼 Admin Dashboard
- **Elegant Card Layout**: Beautiful presentation of feedback entries
- **Timestamp Display**: Chronological organization with formatted dates
- **One-Click Toggle**: Seamless switching between submission and admin views
- **Responsive Design**: Perfect viewing experience on any device
- **Data Visualization**: Clean, organized presentation of user feedback

### 🛠️ Technical Excellence
- **MERN Stack**: MongoDB, Express, React, and Node.js integration
- **Context API**: Efficient state management across components
- **Tailwind CSS**: Utility-first styling for consistent design
- **Axios Interceptors**: Robust API communication with error handling
- **MongoDB Atlas**: Cloud database with high availability

## 🛠️ Tech Stack

### 🌟 Frontend
- **React 18**: Component-based UI library with hooks and context API
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for modern designs
- **Context API**: State management for application-wide data
- **React Toastify**: Elegant notification system
- **Axios**: Promise-based HTTP client for API requests
- **Custom Animations**: Hand-crafted CSS animations and transitions

### ⚙️ Backend
- **Node.js**: JavaScript runtime for server-side logic
- **Express**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Elegant MongoDB object modeling
- **CORS**: Cross-Origin Resource Sharing configuration
- **Morgan**: HTTP request logger middleware
- **Error Handling**: Comprehensive error management system

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js**: v14.0.0 or higher
- **npm/yarn**: Latest version recommended
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For cloning the repository

### 💻 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feedback-collector.git
   cd feedback-collector
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client && npm install

   # Install server dependencies
   cd ../server && npm install
   ```

3. **Set up environment variables**

   **Backend (.env file in server directory)**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

   **Frontend (.env.development in client directory)**
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

### ▶️ Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

#### Production Build (Local Testing)

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend in production mode**
   ```bash
   cd server
   npm start
   ```

3. **Serve the frontend build (optional)**
   ```bash
   cd client
   npx serve -s dist
   ```

## 📁 Project Structure

```
feedback-collector/
├── client/                      # Frontend React application
│   ├── public/                  # Static files
│   │   ├── logo.svg             # Application logo
│   │   └── ...                  # Other static assets
│   ├── src/                     # Source files
│   │   ├── components/          # React components
│   │   │   ├── feedback/        # Feedback-related components
│   │   │   │   ├── FeedbackForm.jsx    # Feedback submission form
│   │   │   │   ├── FeedbackList.jsx    # List of feedback entries
│   │   │   │   └── FeedbackItem.jsx    # Individual feedback card
│   │   │   ├── layout/          # Layout components
│   │   │   │   ├── Header.jsx   # Application header
│   │   │   │   ├── Footer.jsx   # Application footer
│   │   │   │   └── Layout.jsx   # Main layout wrapper
│   │   │   └── ui/              # Reusable UI components
│   │   │       ├── Spinner.jsx  # Loading spinner
│   │   │       └── ThemeToggle.jsx # Dark/light mode toggle
│   │   ├── context/             # Context providers
│   │   │   ├── FeedbackContext.jsx # Feedback data management
│   │   │   └── ThemeContext.jsx # Theme state management
│   │   ├── utils/               # Utility functions
│   │   │   └── config.js        # API configuration
│   │   ├── App.jsx              # Main App component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env.development         # Development environment variables
│   ├── .env.production          # Production environment variables
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
├── server/                      # Backend Node.js application
│   ├── models/                  # Mongoose models
│   │   └── Feedback.js          # Feedback data model
│   ├── routes/                  # API routes
│   │   └── feedbackRoutes.js    # Feedback API endpoints
│   ├── middleware/              # Custom middleware
│   │   ├── errorHandler.js      # Error handling middleware
│   │   └── morganMiddleware.js  # Request logging middleware
│   ├── config/                  # Configuration files
│   │   └── db.js                # Database connection
│   ├── .env                     # Backend environment variables
│   ├── server.js                # Express server
│   └── package.json             # Backend dependencies
└── package.json                 # Root package.json for scripts
```

## 🌐 API Endpoints

### Feedback API

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/feedbacks` | Get all feedback entries | - | Array of feedback objects |
| `POST` | `/submit-feedback` | Submit new feedback | `{ name, email, message }` | Success message with feedback object |

### Response Format

#### GET /feedbacks
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great application! Very intuitive and easy to use.",
    "createdAt": "2023-06-18T14:23:45.000Z",
    "updatedAt": "2023-06-18T14:23:45.000Z"
  },
  // More feedback entries...
]
```

#### POST /submit-feedback
```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great application! Very intuitive and easy to use.",
    "createdAt": "2023-06-18T14:23:45.000Z",
    "updatedAt": "2023-06-18T14:23:45.000Z"
  }
}
```

## ⚙️ Environment Variables

### Backend (.env)
```
PORT=5000                                       # Port for the server to run on
MONGODB_URI=mongodb://localhost:27017/feedback_collector  # MongoDB connection string
NODE_ENV=development                            # Environment (development/production)
```

### Frontend (.env, .env.development, .env.production)
```
# Development environment
VITE_API_BASE_URL=http://localhost:5000         # Backend API URL for development

# Production environment
VITE_API_BASE_URL=https://feedback-collector-pmdf.onrender.com  # Backend API URL for production
```

## 🚢 Deployment

### Frontend Deployment

The frontend is deployed on both Netlify and Vercel:

1. **Netlify Deployment**:
   - URL: [https://vicharaapka.netlify.app/](https://vicharaapka.netlify.app/)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: Set `VITE_API_BASE_URL` to your backend URL

2. **Vercel Deployment**:
   - URL: [https://feedback-collector-inky.vercel.app/](https://feedback-collector-inky.vercel.app/)
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variables: Set `VITE_API_BASE_URL` to your backend URL

### Backend Deployment

The backend is deployed on Render:

- URL: [https://feedback-collector-pmdf.onrender.com/](https://feedback-collector-pmdf.onrender.com/)
- Build command: `npm install`
- Start command: `npm start`
- Environment variables: Set `PORT`, `MONGODB_URI`, and `NODE_ENV=production`

### CORS Configuration

For proper cross-origin requests, the backend's CORS configuration must include all frontend domains:

```javascript
// In server.js
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://feedback-collector-inky.vercel.app',
    'https://vicharaapka.netlify.app'
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
```

## 🧰 Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/guide/)

## 🌟 Future Enhancements

- **User Authentication**: Add user accounts and authentication
- **Dashboard Analytics**: Visualize feedback data with charts and graphs
- **Email Notifications**: Send notifications when new feedback is received
- **Feedback Categories**: Allow categorization of feedback by type
- **Advanced Filtering**: Add more options for filtering and sorting feedback
- **Export Functionality**: Allow exporting feedback data to CSV/PDF

## 👨‍💻 Author

**Vansh Tyagi** - Full Stack Developer

- [GitHub](https://github.com/iamvtyagi)
- [LinkedIn](https://linkedin.com/in/vanshtyagi)
- [Portfolio](https://vanshtyagi.com)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>⭐ If you found this project helpful, please consider giving it a star! ⭐</p>
  <p>© 2023 Vansh Tyagi. All Rights Reserved.</p>
</div>
