const connection = require("../../connection");

async function EditarUsuarioAtivo(req, res) {
  const { id, ativo } = req.body;

  try {
    const updatedUser = await updateUser({
      id,
      ativo,
    });

    if (!updatedUser) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possivel atualizar o usuário."
      );
    }

    return res.status(200).json([updatedUser]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha EditarUsuarioAtivo");
  }
}

async function updateUser(data) {
  const query = "UPDATE usuarios SET ativo = $1 WHERE id = $2 RETURNING *";
  const { rows } = await connection.query(query, [data.ativo, data.id]);
  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarUsuarioAtivo,
};
