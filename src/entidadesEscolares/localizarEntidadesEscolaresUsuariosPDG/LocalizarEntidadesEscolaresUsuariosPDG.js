const connection = require("../../connection");

async function fetchEntidadesEscolaresByUserId(userId) {
  const query = `
    SELECT entidades_escolares.* 
    FROM entidades_escolares
    JOIN usuarios_pdg ON entidades_escolares.id = usuarios_pdg.id_ee
    WHERE usuarios_pdg.id_usuario = $1 AND entidades_escolares.deleted = $2
  `;
  const deleted = false;
  const { rows } = await connection.query(query, [userId, deleted]);
  return rows;
}

async function LocalizarEntidadesEscolaresUsuariosPDG(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ mensagem: "ID do usuário não fornecido." });
  }

  try {
    const entidadesEscolares = await fetchEntidadesEscolaresByUserId(userId);
    return res.status(200).json(entidadesEscolares);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao buscar entidades escolares." });
  }
}

module.exports = {
  LocalizarEntidadesEscolaresUsuariosPDG,
};
