const connection = require("../../connection");

async function ListarAgentesRelacionadoEscolaIsProf(req, res) {
  const { id } = req.query;
  try {
    const agentesData = await fetchAgentes(id);
    return res.status(200).json(agentesData);
  } catch (error) {
    return sendErrorResponse(
      res,
      400,
      "FalhaListagem ListarAgentesProfessoresError"
    );
  }
}

async function fetchAgentes(id) {
  const ativo = true;
  const cargo = "Professor";
  const query = `
    SELECT agentes.*
    FROM agentes_externos agentes
    INNER JOIN vinculos_agentes_externos vinculos
    ON agentes.uuid_agente = vinculos.id_prof
    WHERE vinculos.id_escola = $1 AND agentes.ativo = $2 AND agentes.cargo = $3
  `;

  const { rows } = await connection.query(query, [id, ativo, cargo]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarAgentesRelacionadoEscolaIsProf,
};
