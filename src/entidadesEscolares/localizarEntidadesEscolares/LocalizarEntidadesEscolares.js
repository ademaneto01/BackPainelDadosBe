const connection = require("../../connection");

async function fetchEntidadesEscolares(id) {
  const query =
    "SELECT * FROM entidades_escolares WHERE uuid_ec = $1 AND deleted = $2";
  const deleted = false;
  const { rows } = await connection.query(query, [id, deleted]);

  return rows;
}

async function LocalizarEntidadesEscolares(req, res) {
  const { id } = req.query;

  try {
    const EntidadesEscolaresData = await fetchEntidadesEscolares(id);
    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res
      .status(400)
      .json({ mensagem: "Falha LocalizarEntidadesEscolares" });
  }
}

module.exports = {
  LocalizarEntidadesEscolares,
};
