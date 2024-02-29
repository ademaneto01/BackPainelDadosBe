const connection = require("../../connection");

async function ListarTodosAgentes(req, res) {
  try {
    const agentesData = await fetchAgentes();
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(res, 400, "FalhaListagem ListarTodosAgentes");
  }
}

async function fetchAgentes() {
  const ativo = true;
  const query = "SELECT * FROM agentes_externos WHERE ativo = $1";
  const { rows } = await connection.query(query, [ativo]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarTodosAgentes,
};
