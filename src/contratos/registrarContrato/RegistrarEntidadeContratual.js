const connection = require("../../connection");

async function RegistrarEntidadeContratual(req, res) {
  const fields = req.body;
  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registeredContract = await insertContract(fields);
    if (!registeredContract) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o contrato."
      );
    }
    return res.status(201).json([registeredContract]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = [
    "nome_simplificado",
    "razao_social",
    "cnpj_cont",
    "cep",
    "endereco",
    "cidade",
    "uf",
    "bairro",
    "complemento",
  ];

  return requiredFields.every((field) => fields[field]);
}

async function insertContract(fields) {
  const {
    nome_simplificado,
    razao_social,
    cnpj_cont,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    tipocontrato,
    valorcontrato,
    bo_rede,
  } = fields;
  const deleted = false;
  const qtdEscolas = 0;

  const query =
    "INSERT INTO entidades_contratuais (nome_simplificado, razao_social, cnpj_cont, cep, endereco, cidade, uf, bairro, complemento, tipocontrato, valorcontrato, bo_rede, deleted, qtdescolas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *";

  const {
    rows: [registeredContract],
  } = await connection.query(query, [
    nome_simplificado,
    razao_social,
    cnpj_cont,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    tipocontrato,
    valorcontrato,
    bo_rede,
    deleted,
    qtdEscolas,
  ]);

  return registeredContract;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarEntidadeContratual,
};
