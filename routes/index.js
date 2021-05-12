const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getCocktailsAndPrice,
  getCocktailZutaten,
} = require('../model/cocktails.js');
const router = express.Router();

router.get(
  '/cocktails',
  asyncHandler(async (req, res) => {
    const { price } = req.query;
    const result = await getCocktailsAndPrice(price);
    res.status(result.code).json(result);
  }),
);
router.get(
  '/cocktails/:name/zutaten',
  asyncHandler(async (req, res) => {
    const result = await getCocktailZutaten(req.params.name);
    res.status(result.code).json(result);
  }),
);

module.exports = router;
