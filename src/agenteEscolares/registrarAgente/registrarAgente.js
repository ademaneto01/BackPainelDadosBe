const connection = require("../../connection");

async function RegistrarAgente(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registeredAgente = await insertUserAgente(fields);
    if (!registeredAgente) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o agente."
      );
    }
    return res.status(200).json([registeredAgente]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha registrarAgente");
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["nome", "cargo", "email_primario"];

  return requiredFields.every((field) => fields[field]);
}

async function insertUserAgente(fields) {
  const {
    nome,
    cargo,
    telefone,
    email_primario,
    email_secundario,
    data_nascimento,
    instagram,
    linkedin,
    interlocutor,
    ativo,
  } = fields;

  const query =
    "INSERT INTO agentes_externos (nome, cargo, nu_telefone, no_email_primario, no_email_secundario, data_nascimento, instagram, linkedin, interlocutor, bo_ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";

  const {
    rows: [registeredAgente],
  } = await connection.query(query, [
    nome,
    cargo,
    telefone,
    email_primario,
    email_secundario,
    data_nascimento,
    instagram,
    linkedin,
    interlocutor,
    ativo,
  ]);

  return registeredAgente;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarAgente,
};
