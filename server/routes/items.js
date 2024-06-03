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

module.exports = router;