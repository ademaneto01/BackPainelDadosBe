const connection = require("../../connection");

async function LocalizarAgenteId(req, res) {
  const { id } = req.query;
  try {
    const agentesData = await fetchAgenteById(id);
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha LocalizarAgenteId");
  }
}

async function fetchAgenteById(id) {
  const query = "SELECT * FROM agentes_externos WHERE uuid_agente = $1";
  const { rows } = await connection.query(query, [id]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  LocalizarAgenteId,
};
