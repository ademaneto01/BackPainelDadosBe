const connection = require("../../connection");

async function EditarAtivoEntidadeEscolar(req, res) {
  const { id, ativo } = req.body;

  try {
    const updated = await updateContrato({
      id,
      ativo,
    });

    if (!updated) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possivel atualizar o contrato."
      );
    }

    return res.status(200).json([updated]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function updateContrato(data) {
  const query =
    "UPDATE entidades_escolares SET ativo = $1 WHERE id = $2 RETURNING *";
  const { rows } = await connection.query(query, [data.ativo, data.id]);
  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarAtivoEntidadeEscolar,
};
