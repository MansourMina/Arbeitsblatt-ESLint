const db = require('../db');
async function getCocktailsAndPrice() {
  const { rows } = await db.query('SELECT cname,preis from cocktail');
  return {
    code: 200,
    data: rows,
  };
}

module.exports = { getCocktailsAndPrice };
