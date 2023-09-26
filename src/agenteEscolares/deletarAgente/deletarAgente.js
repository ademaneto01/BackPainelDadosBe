const connection = require("../../connection");

async function DeletarAgente(req, res) {
  const { userId } = req.body;

  try {
    user = await getUserById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    const vinculoUser = await getVinculosUser(userId);
    if (vinculoUser) {
      deleteVinculoUser(userId);
    }

    await deleteUser(userId);

    delete user.senha;

    return res.status(200).json([user]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getUserById(userId) {
  const selectQuery = "SELECT * FROM agentes_externos WHERE id = $1";
  const { rows } = await connection.query(selectQuery, [userId]);
  return rows[0];
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
  const query = "DELETE FROM agentes_externos WHERE id = $1";
  await connection.query(query, [userId]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarAgente,
};
