const connection = require("../../connection");

async function fetchEntidadesEscolaresByUserId(id) {
  const query = `
    SELECT entidades_escolares.* 
    FROM entidades_escolares
    JOIN usuarios_pdg ON entidades_escolares.id = usuarios_pdg.id_ee
    WHERE usuarios_pdg.id_usuario = $1 AND entidades_escolares.deleted = $2
  `;
  const deleted = false;
  const { rows } = await connection.query(query, [id, deleted]);
  return rows;
}

async function LocalizarEntidadesEscolaresUsuariosPDG(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ mensagem: "ID do usuário não fornecido." });
  }

  try {
    const entidadesEscolares = await fetchEntidadesEscolaresByUserId(id);
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
