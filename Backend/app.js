const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User routes with prefix
app.use('/api/v1/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Handle unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
