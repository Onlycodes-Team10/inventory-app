const express = require("express");
const router = express.Router();
const { Sequelize } = require('sequelize');
const { Items } = require('../models/index');

// different model routers
router.use('/items', require('./items'));

// Define the items route
router.get('/items', async (req, res) => {
    try {
      const items = await Items.findAll();
      res.setHeader('Content-Type', 'application/json');
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ error: 'Server error', message: error.message });
    }
  });

// Define the search route
router.get('/search', async (req, res) => {
    const { query, category } = req.query;
  
    let whereClause = [];
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
      console.error('A wild error appeared! ', error);
      res.status(500).json({ error: 'a wild server error appeared! ', message: error.message });
    }
  
  });

module.exports = router;