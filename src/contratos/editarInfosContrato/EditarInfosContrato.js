const connection = require("../../connection");

async function EditarInfosContrato(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const contractData = await updateInfosContract(fields);
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
    "ano_assinatura",
    "ano_operacao",
    "ano_termino",
    "resp_frete",
    "pedido_min",
  ];

  return requiredFields.every((field) => fields[field]);
}

async function updateInfosContract(fields) {
  const {
    id,
    ano_assinatura,
    ano_operacao,
    ano_termino,
    ativo,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
  } = fields;

  const updateDados =
    "UPDATE infos_contrato SET ano_assinatura = $1, ano_operacao = $2, ano_termino = $3, ativo = $4, resp_frete = $5, pedido_min = $6, reajuste_igpm_ipca = $7  WHERE id = $8 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    ano_assinatura,
    ano_operacao,
    ano_termino,
    ativo,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
    id,
  ]);

  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarInfosContrato,
};
