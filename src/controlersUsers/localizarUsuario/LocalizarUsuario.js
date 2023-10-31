const connection = require("../../connection");

async function LocalizarUsuario(req, res) {
  const { id } = req.query;

  try {
    const userData = await getUserById(id);

    if (!userData) {
      return sendErrorResponse(res, 404, "Usuário não encontrado.");
    }

    const entidadeEscolarData = await getEntidadeEscolarById(userData.id_ee);

    if (!entidadeEscolarData) {
      return sendErrorResponse(res, 404, "Entidade escolar não encontrada.");
    }

    userData.escola = entidadeEscolarData.nome_operacional;

    return res.status(200).json([userData]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getUserById(id) {
  const query = "SELECT * FROM usuarios WHERE id = $1";
  const { rows } = await connection.query(query, [id]);
  const user = rows[0];
  if (user) {
    delete user.senha;
  }
  return user;
}

async function getEntidadeEscolarById(id_ee) {
  const query = "SELECT * FROM entidades_escolares WHERE id = $1";
  const { rows } = await connection.query(query, [id_ee]);
  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  LocalizarUsuario,
};
