const express = require("express");
const router = express.Router();
const { Items } = require("../models");

// GET /Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Items.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const oneItem = await Items.findByPk(req.params.id);
    res.send(oneItem);
  } catch (error) {
    next(error);
  }
});

// POST /items
router.post("/", async (req, res, next) => {
  try {
    const newItem = await Items.create(req.body);
    res.send(newItem);
  } catch (error) {
    next(error);
  }
});

// PUT /items/:id
router.put("/:id", async (req, res, next) => {
  try {
    await Items.update(req.body,{
      where:{
        id: req.params.id
      }
    });
    const updatedItem = await Items.findByPk(req.params.id)
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

// DELETE /items/:id 
router.delete("/:id", async (req, res, next) => {
  try {
    const oneItem = await Items.findByPk(req.params.id);
    await oneItem.destroy()
    res.send({message: "Item deleted successfully"});
  } catch (error) {
    next(error);
  }
});

//search
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