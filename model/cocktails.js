const db = require('../db');
async function getCocktailsAndPrice(price) {
  if (price) {
    const {
      rows,
    } = await db.query('SELECT cname,preis from cocktail where preis < $1', [
      price,
    ]);
    return {
      code: 200,
      data: rows,
    };
  } else {
    const { rows } = await db.query('SELECT cname,preis from cocktail');
    return {
      code: 200,
      data: rows,
    };
  }
}
async function getCocktailZutaten(name) {
  try {
    const {
      rows,
    } = await db.query(
      'SELECT zbez from zutat JOIN cocktail on zgid = zid where cname = $1;',
      [name],
    );
    return {
      code: 200,
      data: rows,
    };
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getCocktailsAndPrice,
  getCocktailZutaten,
  
};
