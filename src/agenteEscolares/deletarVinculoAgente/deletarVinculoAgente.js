const connection = require("../../connection");

async function DeletarVinculoAgente(req, res) {
  const { userId, id_ee } = req.body;

  try {
    await deleteVinculoUser(userId, id_ee);

    return res
      .status(204)
      .json({ mensagem: "Vinculo deletado com sucesso..." });
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha deletarVinculoAgente");
  }
}

async function deleteVinculoUser(userId, id_ee) {
  const query =
    "DELETE FROM vinculos_agentes_externos WHERE id_prof = $1 AND id_escola = $2 ";
  await connection.query(query, [userId, id_ee]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarVinculoAgente,
};
