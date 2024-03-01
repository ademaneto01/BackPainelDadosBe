const connection = require("../../connection");

async function EditarInfosContratoTemp(req, res) {
  const fields = req.body;

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
    return sendErrorResponse(res, 400, "Falha EditarInfosContratoTemp");
  }
}

async function updateInfosContract(fields) {
  const { id, temp, ativo } = fields;

  const updateDados =
    "UPDATE infos_contrato SET temp = $1, ativo = $2 WHERE id = $3 RETURNING *";

  const { rows } = await connection.query(updateDados, [temp, ativo, id]);

  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarInfosContratoTemp,
};
