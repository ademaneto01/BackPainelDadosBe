const connection = require("../../connection");

async function ListarTodosAgentes(req, res) {
  try {
    const agentesData = await fetchAgentes();
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchAgentes() {
  const query = "SELECT * FROM agentes_externos";
  const { rows } = await connection.query(query);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarTodosAgentes,
};
