const connection = require("../../connection");

async function fetchAcompanhamentosById(id) {
  const query = `
    (
      SELECT a.*
      FROM acompanhamento_pdg a
      WHERE a.id = $1 
   )
  `;

  const { rows } = await connection.query(query, [id]);
  return rows;
}

async function LocalizarAcompanhamentoById(req, res) {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ mensagem: "ID do acompanhamento não fornecido." });
  }

  try {
    const entidadesEscolares = await fetchAcompanhamentosById(id);

    return res.status(200).json(entidadesEscolares);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Falha LocalizarAcompanhamentoById" });
  }
}

module.exports = {
  LocalizarAcompanhamentoById,
};
