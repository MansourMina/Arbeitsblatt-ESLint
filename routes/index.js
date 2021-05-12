const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  getCocktailsAndPrice,
  getCocktailZutaten,
} = require('../model/cocktails.js');
const router = express.Router();

router.get(
  '/cocktails/price',
  asyncHandler(async (req, res) => {
    const result = await getCocktailsAndPrice();
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
