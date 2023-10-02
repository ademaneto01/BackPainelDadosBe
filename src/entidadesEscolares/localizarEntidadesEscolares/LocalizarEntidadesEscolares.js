const connection = require("../../connection");

async function fetchEntidadesEscolares(uuid_ec) {
  const query =
    "SELECT * FROM entidades_escolares WHERE uuid_ec = $1 AND deleted = $2";
  const deleted = false;
  const { rows } = await connection.query(query, [uuid_ec, deleted]);

  return rows;
}

async function LocalizarEntidadesEscolares(req, res) {
  const { uuid_ec } = req.body;

  try {
    const EntidadesEscolaresData = await fetchEntidadesEscolares(uuid_ec);
    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  LocalizarEntidadesEscolares,
};
