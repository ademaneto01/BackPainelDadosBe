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
    return sendErrorResponse(res, 400, "Falha EditarInfosContrato");
  }
}

function validateRequiredFields(fields) {
  const requiredFields = [
    "id",
    "ano_assinatura",
    "ano_operacao",
    "ano_termino",
    "resp_frete",
  ];

  return requiredFields.every((field) => fields[field]);
}

async function updateInfosContract(fields) {
  const newTimeStamp = new Date();
  const {
    id,
    ano_assinatura,
    ano_operacao,
    ano_termino,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
    exclusividade,
    tipoexclusividade,
    incentivos,
    qtdbolsas,
    tipocontrato,
    valorcontrato,
    repasse,
    comentario,
  } = fields;

  const updateDados =
    "UPDATE infos_contrato SET ano_assinatura = $1, ano_operacao = $2, ano_termino = $3, resp_frete = $4, pedido_min = $5, reajuste_igpm_ipca = $6, exclusividade = $7, tipoexclusividade = $8, incentivos = $9, qtdbolsas = $10, tipocontrato = $11, valorcontrato = $12, repasse = $13, comentario = $14, edited_on = $15  WHERE id = $16 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    ano_assinatura,
    ano_operacao,
    ano_termino,
    resp_frete,
    pedido_min,
    reajuste_igpm_ipca,
    exclusividade,
    tipoexclusividade,
    incentivos,
    qtdbolsas,
    tipocontrato,
    valorcontrato,
    repasse,
    comentario,
    newTimeStamp,
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
