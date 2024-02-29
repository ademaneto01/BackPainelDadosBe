const connection = require("../../connection");

async function LocalizarUsuarios(req, res) {
  try {
    const users = await getAllUsersWithSchoolName();
    return res.status(200).json(users);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha LocalizarUsuarios");
  }
}

async function getAllUsersWithSchoolName() {
  const usersQuery = "SELECT * FROM usuarios";
  const { rows: users } = await connection.query(usersQuery);

  const schoolIds = users.map((user) => user.id_ee);
  const schoolsQuery = `
      SELECT * FROM entidades_escolares WHERE id = ANY($1)
    `;
  const { rows: schools } = await connection.query(schoolsQuery, [schoolIds]);

  const schoolById = {};
  for (const school of schools) {
    schoolById[school.id] = school;
  }

  return users.map((user) => {
    user.escola = schoolById[user.id_ee]?.nome_operacional;
    return user;
  });
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  LocalizarUsuarios,
};
