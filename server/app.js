// load environment variables from .env or elsewhere
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const { Sequelize } = require('sequelize');


//Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../dist')));

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { query, category } = req.query;

  let whereClause = {};
  if (query) {
    switch (category) {
      case 'name':
        whereClause.name = { [Sequelize.Op.like]: `%${query}%` };
        break;
      case 'category':
        whereClause.category = { [Sequelize.Op.like]: `%${query}%` };
        break;
      case 'description':
        whereClause.description = { [Sequelize.Op.like]: `%${query}%` };
        break;
      case 'price':
        whereClause.price = { [Sequelize.Op.eq]: parseFloat(query) };
        break;
      default:
        whereClause = {
          [Sequelize.Op.or]: [
            { name: { [Sequelize.Op.like]: `%${query}%` } },
            { category: { [Sequelize.Op.like]: `%${query}%` } },
            { description: { [Sequelize.Op.like]: `%${query}%` } },
            { price: { [Sequelize.Op.eq]: parseFloat(query) } }
          ]
        };
    }
  }

  try {
    const results = await Items.findAll({ where: whereClause });
    res.setHeader('Content-Type', 'application/json');
    res.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// api router
app.use('/api', routes);

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