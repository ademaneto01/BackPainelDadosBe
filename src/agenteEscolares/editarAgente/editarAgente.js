const connection = require("../../connection");

async function EditarAgente(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const contractData = await updateAgente(fields);
    if (!contractData) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível atualizar o usuário."
      );
    }
    return res.status(200).json([contractData]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = [
    "id",
    "nome",
    "email_primario",
    "email_secundario",
    "ativo",
  ];

  return requiredFields.every((field) => fields[field]);
}

async function updateAgente(fields) {
  const { id, nome, email_primario, email_secundario, ativo } = fields;

  const updateDados =
    "UPDATE agentes_externos SET nome = $1, email_primario = $2, email_secundario = $3, ativo = $4 WHERE id = $5 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    nome,
    email_primario,
    email_secundario,
    ativo,
    id,
  ]);

  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarAgente,
};
