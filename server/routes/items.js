const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /Items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const oneItem = await Item.findByPk(req.params.id);
    res.send(oneItem);
  } catch (error) {
    next(error);
  }
});

module.exports = router;