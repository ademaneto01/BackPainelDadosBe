const connection = require("../../connection");

async function fetchAcompanhamentoCriteriaById(id) {
  const query = `
    (
      SELECT a.*
      FROM acompanhamento_pdg_criteria a
      WHERE a.id_acmp = $1 
   )
  `;

  const { rows } = await connection.query(query, [id]);
  return rows;
}

async function LocalizarAcompanhamentoCriteriaById(req, res) {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ mensagem: "ID do acompanhamento não fornecido." });
  }

  try {
    const entidadesEscolares = await fetchAcompanhamentoCriteriaById(id);

    return res.status(200).json(entidadesEscolares);
  } catch (error) {
    return res.status(500).json({ mensagem: "Falha LocalizarCriteriaById" });
  }
}

module.exports = {
  LocalizarAcompanhamentoCriteriaById,
};
