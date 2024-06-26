const connection = require("../../connection");

async function LocalizarUrlPainel(req, res) {
  const { id } = req.query;

  try {
    const query = "SELECT * FROM painel_dados WHERE id_ee = $1";
    const { rows } = await connection.query(query, [id]);

    const url_dados = rows;

    return res.status(200).json(url_dados);
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha LocalizarUrlPainel" });
  }
}

module.exports = { LocalizarUrlPainel };
