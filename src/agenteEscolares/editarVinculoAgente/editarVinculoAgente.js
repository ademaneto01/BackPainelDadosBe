const connection = require("../../connection");

async function EditarVinculoAgente(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const updatedVinculoAgente = await updateVinculoAgente(fields);
    if (!updatedVinculoAgente) {
      return sendErrorResponse(res, 400, "Não foi possível vincular o agente.");
    }
    return res.status(200).json([updatedVinculoAgente]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["id_prof", "id_escola"];

  return requiredFields.every((field) => field in fields);
}

async function updateVinculoAgente(fields) {
  const { id_prof, id_escola, especialista, ...escolas } = fields;

  const camposOpcionaisEscolasKeys = Object.keys(escolas);
  const camposOpcionaisEscolasValues = camposOpcionaisEscolasKeys.map(
    (key) => escolas[key]
  );

  const camposOpcionaisEscolasSql = camposOpcionaisEscolasKeys
    .map((key, index) => `${key} = $${index + 4}`)
    .join(", ");

  const query = `
    UPDATE vinculos_agentes_externos SET especialista = $1, ${camposOpcionaisEscolasSql} WHERE id_prof = $2 AND id_escola = $3 RETURNING *
      `;

  const valoresConsulta = [
    especialista,
    id_prof,
    id_escola,
    ...camposOpcionaisEscolasValues,
  ];

  const {
    rows: [updateAgente],
  } = await connection.query(query, valoresConsulta);

  return updateAgente;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarVinculoAgente,
};
