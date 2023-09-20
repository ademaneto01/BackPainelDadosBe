const connection = require("../../connection");

async function DeletarUsuario(req, res) {
  const { userId } = req.body;

  try {
    user = await getUserById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    if (user.perfil === "Pedagógico") {
      await deleteUserFromPDG(userId);
    }
    await deleteUser(userId);

    delete user.senha;

    return res.status(200).json([user]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getUserById(userId) {
  const selectQuery = "SELECT * FROM usuarios WHERE id = $1";
  const { rows } = await connection.query(selectQuery, [userId]);
  return rows[0];
}

async function deleteUserFromPDG(userId) {
  const queryUsuarioPdg = "DELETE FROM usuarios_pdg WHERE id_usuario = $1";
  await connection.query(queryUsuarioPdg, [userId]);
}

async function deleteUser(userId) {
  const queryUsuario = "DELETE FROM usuarios WHERE id = $1";
  await connection.query(queryUsuario, [userId]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarUsuario,
};
