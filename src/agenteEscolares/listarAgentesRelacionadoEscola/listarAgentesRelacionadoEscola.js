const connection = require("../../connection");

async function ListarAgentesRelacionadoEscola(req, res) {
  const { id_ee } = req.body;
  try {
    const agentesData = await fetchAgentes(id_ee);
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchAgentes(id_ee) {
  const query = `
    SELECT agentes.*
    FROM agentes_externos agentes
    INNER JOIN vinculos_agentes_externos vinculos
    ON agentes.id = vinculos.id_prof
    WHERE vinculos.id_escola = $1
  `;

  const { rows } = await connection.query(query, [id_ee]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarAgentesRelacionadoEscola,
};
