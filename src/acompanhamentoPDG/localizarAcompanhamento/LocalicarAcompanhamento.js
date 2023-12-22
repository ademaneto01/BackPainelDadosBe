const connection = require("../../connection");

async function fetchAcompanhamentosByUserId(id) {
  const query = `
    (
      SELECT a.*
      FROM acompanhamento_pdg a
      JOIN usuarios_pdg u ON a.id_ee = u.id_ee 
      WHERE u.id_usuario = $1 AND a.deleted = false
    )
    UNION
    (
      SELECT a.*
      FROM acompanhamento_pdg a
      WHERE a.id_user = $1 AND a.deleted = false
    );
  `;

  const { rows } = await connection.query(query, [id]);
  return rows;
}

async function LocalizarAcompanhamentoUsuariosPDG(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ mensagem: "ID do usuário não fornecido." });
  }

  try {
    const entidadesEscolares = await fetchAcompanhamentosByUserId(id);
    return res.status(200).json(entidadesEscolares);
  } catch (error) {
    return res.status(500).json({ mensagem: error });
  }
}

module.exports = {
  LocalizarAcompanhamentoUsuariosPDG,
};
