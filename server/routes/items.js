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
    const updatedItem = await Items.update(req.body,{
      where:{
        id: req.params.id
      }
    });
    res.send(updatedItem);
  } catch (error) {
    next(error);
  }
});

// DELETE /items/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedItem = await Items.destroy(req.params.id);
    res.send(deletedItem);
  } catch (error) {
    next(error);
  }
}); 

module.exports = router;
