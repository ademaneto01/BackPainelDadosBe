const connection = require("../../connection");

async function DeletarAgente(req, res) {
  const { userId } = req.body;

  try {
    const vinculoUser = await getVinculosUser(userId);

    if (vinculoUser !== undefined && vinculoUser !== null) {
      deleteVinculoUser(userId);
    }

    await deleteUser(userId);

    return res
      .status(204)
      .json({ mensagem: "Agente externo deletado com sucesso..." });
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha deletarAgente");
  }
}

async function getVinculosUser(userId) {
  const selectQuery =
    "SELECT * FROM vinculos_agentes_externos WHERE id_prof = $1";
  const { rows } = await connection.query(selectQuery, [userId]);
  return rows[0];
}

async function deleteVinculoUser(userId) {
  const query = "DELETE FROM vinculos_agentes_externos WHERE id_prof = $1";
  await connection.query(query, [userId]);
}

async function deleteUser(userId) {
  const ativo = false;
  const query =
    "UPDATE agentes_externos SET ativo = $1 WHERE uuid_agente = $2 RETURNING *";
  await connection.query(query, [ativo, userId]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarAgente,
};
