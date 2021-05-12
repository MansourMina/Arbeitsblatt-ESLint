const db = require('../db');

async function getCocktailsAndPrice(price) {
  if (price) {
    const {
      rows,
    } = await db.query('SELECT cname,preis from cocktail where preis <= $1', [
      price,
    ]);
    return {
      code: 200,
      data: rows,
    };
  }
  const { rows } = await db.query('SELECT cname,preis from cocktail');
  return {
    code: 200,
    data: rows,
  };
}
async function getCocktailZutaten(name) {
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
}

async function deleteCocktail(name) {
  const { rows } = await db.query('SELECT * from cocktail where cname = $1', [
    name,
  ]);
  if (rows.length > 0) {
    await db.query('DELETE from cocktail where cname = $1;', [name]);
    return {
      code: 200,
      data: `Cocktail ${name} deleted!`,
    };
  }
  return {
    code: 404,
    data: `Cocktail ${name} not found `,
  };
}
async function addCocktail(cocktail) {
  const { rows } = await db.query('SELECT Max(cid) as max from cocktail');
  const newCocktailId = rows[0].max + 1;
  await db.query(
    'INSERT INTO cocktail (cid, cname, preis, zubereitung, kid, zgid, sgid) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      newCocktailId,
      cocktail.name,
      cocktail.preis,
      cocktail.zubereitung,
      cocktail.kid,
      cocktail.zgid,
      cocktail.sgid,
    ],
  );
  return {
    code: 200,
    data: `Inserted ${newCocktailId}`,
  };
}
module.exports = {
  getCocktailsAndPrice,
  getCocktailZutaten,
  deleteCocktail,
  addCocktail,
};
