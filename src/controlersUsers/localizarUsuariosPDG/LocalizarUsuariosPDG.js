const connection = require("../../connection");

async function LocalizarUsuariosPDG(req, res) {
  try {
    const users = await getUsersWithPedagogicoProfile();
    return res.status(200).json(users);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha LocalizarUsuariosPDG");
  }
}

async function getUsersWithPedagogicoProfile() {
  const perfil = "Pedagógico";
  const query = "SELECT * FROM usuarios WHERE perfil = $1";
  const { rows } = await connection.query(query, [perfil]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  LocalizarUsuariosPDG,
};
