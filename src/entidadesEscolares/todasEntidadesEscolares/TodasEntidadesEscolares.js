const connection = require("../../connection");

async function fetchAllEntidadesEscolares() {
  const query = "SELECT * FROM entidades_escolares WHERE deleted = $1";
  const deleted = false;
  const { rows } = await connection.query(query, [deleted]);
  return rows;
}

async function TodasEntidadesEscolares(req, res) {
  try {
    const EntidadesEscolaresData = await fetchAllEntidadesEscolares();
    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  TodasEntidadesEscolares,
};
