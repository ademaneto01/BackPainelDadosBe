const connection = require("../../connection");

async function VincularAgente(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const vincularAgente = await insertVinculoAgente(fields);
    if (!vincularAgente) {
      return sendErrorResponse(res, 400, "Não foi possível vincular o agente.");
    }
    return res.status(200).json([vincularAgente]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["id_prof", "id_escola", "especialista"];

  return requiredFields.every((field) => fields[field]);
}

async function insertVinculoAgente(fields) {
  const { id_prof, id_escola, especialista, ...escolas } = fields;

  const camposOpcionaisEscolasKeys = Object.keys(escolas);
  const camposOpcionaisEscolasValues = camposOpcionaisEscolasKeys.map(
    (key) => escolas[key]
  );

  const camposOpcionaisEscolasSql = camposOpcionaisEscolasKeys
    .map((key, index) => `$${index + 4}`)
    .join(", ");

  const query = `
      INSERT INTO vinculos_agentes_externos (id_prof, id_escola, especialista, ${camposOpcionaisEscolasKeys.join(
        ", "
      )})
      VALUES ($1, $2, $3, ${camposOpcionaisEscolasSql})
      RETURNING *
    `;

  const valoresConsulta = [
    id_prof,
    id_escola,
    especialista,
    ...camposOpcionaisEscolasValues,
  ];

  const {
    rows: [vincularAgente],
  } = await connection.query(query, valoresConsulta);

  return vincularAgente;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  VincularAgente,
};
