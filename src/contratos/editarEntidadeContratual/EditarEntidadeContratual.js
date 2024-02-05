const connection = require("../../connection");

async function EditarEntidadeContratual(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const contractData = await updateContract(fields);
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

async function updateContract(fields) {
  const {
    id,
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

  const updateDados =
    "UPDATE entidades_contratuais SET nome_simplificado = $1, razao_social = $2, cnpj_cont = $3, cep = $4, endereco = $5, cidade = $6, uf = $7, bairro = $8, complemento = $9, tipocontrato = $10, valorcontrato = $11, bo_rede = $12 WHERE id = $13 RETURNING *";

  const { rows } = await connection.query(updateDados, [
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
    id,
  ]);

  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarEntidadeContratual,
};
