const connection = require("../../connection");

async function ListarVinculoAgente(req, res) {
  const { userId, id_ee } = req.body;
  try {
    const agentesData = await fetchVinculoAgentes(userId, id_ee);
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchVinculoAgentes(userId, id_ee) {
  const query =
    "SELECT * FROM vinculos_agentes_externos WHERE id_prof = $1 AND id_escola = $2";
  const { rows } = await connection.query(query, [userId, id_ee]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarVinculoAgente,
};
