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
  const requiredFields = ["id", "nome", "cargo", "email_primario", "ativo"];

  return requiredFields.every((field) => fields[field]);
}

async function updateAgente(fields) {
  const { id, nome, telefone, cargo, email_primario, email_secundario, data_nascimento, interlocutor, ativo } =
    fields;

  const updateDados =
    "UPDATE agentes_externos SET nome = $1, nu_telefone = $2, no_email_primario = $3, no_email_secundario = $4, cargo = $5, data_nascimento = $6, interlocutor = $7, bo_ativo = $8  WHERE uuid_agente = $9 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    nome,
    telefone,
    email_primario,
    email_secundario,
    cargo,
    data_nascimento,
    interlocutor,
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
