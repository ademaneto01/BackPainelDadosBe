const connection = require("../../connection");

async function fetchEntidadeEscolarById(id) {
  const query = "SELECT * FROM entidades_escolares WHERE id = $1";
  const { rows } = await connection.query(query, [id]);
  return rows[0];
}

async function fetchUsuariosPDGById(id) {
  const localizarUsuarioPDG = "SELECT * FROM usuarios_pdg WHERE id_ee = $1";
  const { rows } = await connection.query(localizarUsuarioPDG, [id]);
  return rows[0];
}

async function fetchUrlDadosById(id) {
  const localizarUrlDados = "SELECT * FROM painel_dados WHERE id_ee = $1";
  const { rows } = await connection.query(localizarUrlDados, [id]);
  return rows[0];
}

async function LocalizarEntidadeEscolar(req, res) {
  const { id } = req.query;
  console.log(id, "entidade");
  try {
    const entidade = await fetchEntidadeEscolarById(id);
    const usuarioPDG = await fetchUsuariosPDGById(id);
    const urlDados = await fetchUrlDadosById(id);

    if (usuarioPDG) {
      entidade.id_usuario_pdg = usuarioPDG.id_usuario;
    } else {
      entidade.id_usuario_pdg = null;
    }

    if (urlDados) {
      entidade.url_dados = urlDados.url_dados;
    } else {
      entidade.url_dados = null;
    }

    return res.status(200).json([entidade]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  LocalizarEntidadeEscolar,
};
