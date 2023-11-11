var pool = require("./bd");

async function getNovedaddes() {
  var query = "select * from novedades";
  var rows = await pool.query(query);
  return rows;
}

async function insertNovedad(obj) {
  try {
    var query = "insert into novedades set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  getNovedaddes,
  insertNovedad,
};
