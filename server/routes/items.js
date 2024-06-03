const express = require("express");
const router = express.Router();
const { Items } = require("../models");

// GET /sauce
// router.get("/", async (req, res, next) => {
//   try {
//     const sauces = await Sauce.findAll();
//     res.send(sauces);
//   } catch (error) {
//     next(error);
//   }
// });


// GET /items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const oneItem = await Items.findByPk(req.params.id);
    res.send(oneItem);
  } catch (error) {
    next(error);
  }
});





module.exports = router;
