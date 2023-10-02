const connection = require("../../connection");

async function LocalizarUrlPainel(req, res) {
  const { id_ee } = req.body;

  try {
    const query = "SELECT * FROM painel_dados WHERE id_ee = $1";
    const { rows } = await connection.query(query, [id_ee]);

    const url_dados = rows;

    return res.status(200).json(url_dados);
  } catch (error) {
    return error.message;
  }
}

module.exports = { LocalizarUrlPainel };
