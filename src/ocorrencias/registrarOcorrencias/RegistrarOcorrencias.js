const connection = require("../../connection");

async function RegistrarOcorrencia(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registrarOcorrencia = await insertUserAgente(fields);
    if (!registrarOcorrencia) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o agente."
      );
    }
    return res.status(200).json([registrarOcorrencia]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha ao Registrar Ocorrência");
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["texto_ocorrencia"];

  return requiredFields.every((field) => fields[field]);
}

async function insertUserAgente(fields) {
  const {
    texto_ocorrencia,
    user_escola,
    id_user,
    id_ee,
    tipo,
    canal,
    confidencial,
  } = fields;

  const query =
    "INSERT INTO ocorrencias (texto_ocorrencia, tipo, canal, confidencial, user_escola, id_user, id_ee) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

  const {
    rows: [registrarOcorrencia],
  } = await connection.query(query, [
    texto_ocorrencia,
    tipo,
    canal,
    confidencial,
    user_escola,
    id_user,
    id_ee,
  ]);

  return registrarOcorrencia;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarOcorrencia,
};
