const connection = require("../../connection");

async function RegistrarInfosContrato(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registeredInfosContract = await insertInfosContract(fields);
    if (!registeredInfosContract) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o contrato."
      );
    }
    return res.status(201).json([registeredInfosContract]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = [
    "uuid_ec",
    "ano_assinatura",
    "ano_operacao",
    "ano_termino",
    "resp_frete",
    "pedido_min",
  ];

  return requiredFields.every((field) => fields[field]);
}

async function insertInfosContract(fields) {
  const {
    uuid_ec,
    ano_assinatura,
    ano_operacao,
    ano_termino,
    ativo,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
  } = fields;

  const query =
    "INSERT INTO infos_contrato (  uuid_ec, ano_assinatura, ano_operacao, ano_termino, ativo, resp_frete, pedido_min, reajuste_igpm_ipca) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

  const {
    rows: [registeredContract],
  } = await connection.query(query, [
    uuid_ec,
    ano_assinatura,
    ano_operacao,
    ano_termino,
    ativo,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
  ]);

  return registeredContract;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarInfosContrato,
};
