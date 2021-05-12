const express = require('express');
const asyncHandler = require('express-async-handler');
const { getCocktailsAndPrice } = require('../model/cocktails.js');
const router = express.Router();

router.get(
  '/cocktails/price',
  asyncHandler(async (req, res) => {
    const result = await getCocktailsAndPrice();
    res.status(result.code).json(result);
  }),
);

module.exports = router;
