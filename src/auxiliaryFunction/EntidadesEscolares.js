const connection = require("../connection");

async function registrarEntidadeEscolar(req, res) {
  const {
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    ativo,
    uuid_ec,
    url_dados,
    id_usuario_pdg,
  } = req.body;

  if (
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
    const deleted = false;
    const query =
      "INSERT INTO entidades_escolares ( nome_operacional, cnpj_escola, cep, endereco, cidade, uf, bairro, complemento, ativo, uuid_ec, deleted ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
    const {
      rows: [registredEntidadesEscolares],
    } = await connection.query(query, [
      nome_operacional,
      cnpj_escola,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      ativo,
      uuid_ec,
      deleted,
    ]);

    const queryInsertUrlDados =
      "INSERT INTO painel_dados(id_ee, url_dados) VALUES ($1, $2)";

    await connection.query(queryInsertUrlDados, [
      registredEntidadesEscolares.id,
      url_dados,
    ]);

    if (!registredEntidadesEscolares) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar a entidade escolar." });
    }
    const active = true;
    const queryCount =
      "SELECT COUNT(*) FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
    const { rows } = await connection.query(queryCount, [uuid_ec, active]);
    const count = rows[0].count;
    const updateDados =
      "UPDATE entidades_contratuais SET qtdEscolas = $1 WHERE id = $2";
    await connection.query(updateDados, [count, uuid_ec]);

    const entidadeEscolarId = registredEntidadesEscolares.id;

    if (id_usuario_pdg) {
      const queryInsertUser =
        "INSERT INTO usuarios_pdg(id_ee, id_usuario) VALUES ($1, $2)";

      await connection.query(queryInsertUser, [
        entidadeEscolarId,
        id_usuario_pdg,
      ]);
    }

    return res.status(201).json(registredEntidadesEscolares);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function editarEntidadeEscolar(req, res) {
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
    ativo,
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
    const updateDados =
      "UPDATE entidades_escolares SET nome_operacional = $1, cnpj_escola = $2, cep = $3, endereco = $4, cidade = $5, uf = $6, bairro = $7, complemento = $8, ativo = $9 WHERE id = $10 RETURNING *";
    const { rowCount, rows: entidadeEdited } = await connection.query(
      updateDados,
      [
        nome_operacional,
        cnpj_escola,
        cep,
        endereco,
        cidade,
        uf,
        bairro,
        complemento,
        ativo,
        id,
      ]
    );

    const updatePainelDados =
      "UPDATE painel_dados SET url_dados = $1 WHERE id_ee = $2";

    await connection.query(updatePainelDados, [url_dados, id]);

    const deletarUsuarioPDG = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
    await connection.query(deletarUsuarioPDG, [id]);
    if (id_usuario_pdg) {
      const queryInsertUser =
        "INSERT INTO usuarios_pdg(id_ee, id_usuario) VALUES ($1, $2)";

      await connection.query(queryInsertUser, [id, id_usuario_pdg]);
    }

    if (rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar a entidade escolar." });
    }
    const dataEntidade = entidadeEdited;
    return res.status(200).json(dataEntidade);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deletarUsuarioEscola(req, res) {
  const { id_ee, id_usuario } = req.body;

  try {
    const deleteUserEscola =
      "DELETE FROM usuarios_pdg WHERE id_ee = $1 AND id_usuario = $2";
    await connection.query(deleteUserEscola, [id_ee, id_usuario]);

    return res
      .status(200)
      .json({ message: "Usuário escola excluído com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarEntidadesEscolares(req, res) {
  const { uuid_ec } = req.body;
  try {
    const deleted = false;
    const query =
      "SELECT * FROM entidades_escolares WHERE uuid_ec = $1 AND deleted = $2";
    const { rows } = await connection.query(query, [uuid_ec, deleted]);

    const EntidadesEscolaresData = rows;

    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function todasEntidadesEscolares(req, res) {
  try {
    const deleted = false;
    const query = "SELECT * FROM entidades_escolares WHERE deleted = $1";
    const { rows } = await connection.query(query, [deleted]);

    const EntidadesEscolaresData = rows;

    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarEntidadeEscolar(req, res) {
  const { id } = req.body;
  try {
    const query = "SELECT * FROM entidades_escolares WHERE id = $1";
    const { rows } = await connection.query(query, [id]);

    const localizarUsuarioPDG = "SELECT * FROM usuarios_pdg WHERE id_ee = $1";
    const { rows: usuariosPDG } = await connection.query(localizarUsuarioPDG, [
      id,
    ]);

    const localizarUrlDados = "SELECT * FROM painel_dados WHERE id_ee = $1";
    const { rows: urlDados } = await connection.query(localizarUrlDados, [id]);

    rows[0].id_usuario_pdg = usuariosPDG[0].id_usuario;
    rows[0].url_dados = urlDados[0].url_dados;
    const EntidadeEscolar = rows;

    return res.status(200).json(EntidadeEscolar);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarEntidadesEscolaresUsuariosPDG(req, res) {
  const { userId } = req.body;
  try {
    const query = `
      SELECT entidades_escolares.* 
      FROM entidades_escolares
      JOIN usuarios_pdg ON entidades_escolares.id = usuarios_pdg.id_ee
      WHERE usuarios_pdg.id_usuario = $1 
    `;

    const { rows } = await connection.query(query, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deletarEntidadeEscolar(req, res) {
  const { id } = req.body;

  try {
    const deleted = true;
    const ativo = false;
    const deleteQueryEntidadesEscolares =
      "UPDATE entidades_escolares SET deleted = $1 , ativo = $2 WHERE id = $3 RETURNING *";
    const { rows } = await connection.query(deleteQueryEntidadesEscolares, [
      deleted,
      ativo,
      id,
    ]);

    const deleteUsuariosPdg = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
    await connection.query(deleteUsuariosPdg, [id]);

    const deletePainelDados = "DELETE FROM painel_dados WHERE id_ee = $1";
    await connection.query(deletePainelDados, [id]);

    const sitaucao = true;
    const queryCount =
      "SELECT COUNT(*) FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
    const { rows: contadora } = await connection.query(queryCount, [
      rows[0].uuid_ec,
      sitaucao,
    ]);

    const count = contadora[0].count;
    const updateDados =
      "UPDATE entidades_contratuais SET qtdEscolas = $1 WHERE id = $2";
    await connection.query(updateDados, [count, rows[0].uuid_ec]);

    const updateEntidadeEscolar = rows;
    return res.status(200).json(updateEntidadeEscolar);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registrarEntidadeEscolar,
  editarEntidadeEscolar,
  deletarUsuarioEscola,
  localizarEntidadesEscolares,
  localizarEntidadesEscolaresUsuariosPDG,
  deletarEntidadeEscolar,
  localizarEntidadeEscolar,
  todasEntidadesEscolares,
};
