const connection = require("../../connection");

async function DeletarVinculoAgente(req, res) {
  const { userId, id_ee } = req.body;

  try {
    const user = await getVinculoUser(userId, id_ee);
    await deleteVinculoUser(userId, id_ee);

    return res.status(200).json([user]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getVinculoUser(userId, id_ee) {
  const selectQuery =
    "SELECT * FROM vinculos_agentes_externos WHERE id_prof = $1 AND id_escola = $2";
  const { rows } = await connection.query(selectQuery, [userId, id_ee]);
  return rows[0];
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
