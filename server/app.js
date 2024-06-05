// load environment variables from .env or elsewhere
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { Items, db } = require('./models/index');

//Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../dist')));

// api router
app.use('/api', require('./routes'));

// search endpoint
app.get('/api/search', async (req, res) => {
  const { query, category } = req.query;

  let whereClause = {};
  if (category && category !== 'all') {
    whereClause.category = category;
  }
  if (query) {
    whereClause.name = {
      [Sqeuelize.Op.like]: '%${query}%',
    };
  }

  try {
    const results = await Items.findAll({ where: whereClause });
    res.json(results);
  } catch (error) {
    console.error('a wild error appeared! ', error);
    res.status(500).send('Server error');
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message, table: error.table});
});

module.exports = app;


