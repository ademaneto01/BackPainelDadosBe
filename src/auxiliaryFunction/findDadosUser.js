const connection = require("../connection");

async function findDadosUser(req, res) {
  const { userId } = req.body;

  try {
    const query = "SELECT * FROM painel_dados WHERE id_usuario = $1";
    const { rows } = await connection.query(query, [userId]);

    const url = rows;

    return res.status(200).json(url);
  } catch (error) {
    return error.message;
  }
}

module.exports = { findDadosUser };
