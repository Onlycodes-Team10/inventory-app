// load environment variables from .env or elsewhere
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const routes = require('./routes'); // Import the routes

// Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../public/dist')));

// Use the routes
app.use('/api', routes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: '404 - Not Found', message: 'No route found for the requested URL' });
});

// Serve the main HTML for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message, table: error.table });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
