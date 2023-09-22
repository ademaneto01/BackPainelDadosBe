const connection = require("../../connection");

async function updateEntidade(data) {
  const query = `
      UPDATE entidades_escolares 
      SET nome_operacional = $1, cnpj_escola = $2, cep = $3, endereco = $4, cidade = $5, 
      uf = $6, bairro = $7, complemento = $8, ativo = $9 
      WHERE id = $10 RETURNING *`;
  const values = [
    data.nome_operacional,
    data.cnpj_escola,
    data.cep,
    data.endereco,
    data.cidade,
    data.uf,
    data.bairro,
    data.complemento,
    data.ativo,
    data.id,
  ];

  const { rowCount, rows } = await connection.query(query, values);
  return { rowCount, entidade: rows[0] };
}

async function updatePainelDados(id, url_dados) {
  const query = "UPDATE painel_dados SET url_dados = $1 WHERE id_ee = $2";
  await connection.query(query, [url_dados, id]);
}

async function manageUsuarioPDG(id, id_usuario_pdg) {
  const queryFindUserPDG = "SELECT * FROM usuarios_pdg WHERE id_ee = $1";
  await connection.query(queryFindUserPDG, [id]);
  if (queryFindUserPDG && id_usuario_pdg) {
    const deletarUsuarioPDG = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
    await connection.query(deletarUsuarioPDG, [id]);
  }

  if (id_usuario_pdg) {
    const queryInsertUser =
      "INSERT INTO usuarios_pdg(id_ee, id_usuario) VALUES ($1, $2)";
    await connection.query(queryInsertUser, [id, id_usuario_pdg]);
  }
}

async function EditarEntidadeEscolar(req, res) {
  const {
    id,
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    url_dados,
    id_usuario_pdg,
  } = req.body;

  if (
    !id ||
    !nome_operacional ||
    !cnpj_escola ||
    !cep ||
    !endereco ||
    !cidade ||
    !uf ||
    !bairro ||
    !complemento ||
    !url_dados
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const { rowCount, entidade } = await updateEntidade(req.body);
    await updatePainelDados(id, url_dados);
    await manageUsuarioPDG(id, id_usuario_pdg);

    if (rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível atualizar a entidade escolar." });
    }

    return res.status(200).json([entidade]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  EditarEntidadeEscolar,
};
