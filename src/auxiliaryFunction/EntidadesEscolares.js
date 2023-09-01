const connection = require("../connection");

async function registerEntidadeEscolar(req, res) {
  const {
    nome_contratual,
    tipo_rede,
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    id_contrato,
    id_usuarios_pg,
  } = req.body;

  if (
    !nome_contratual ||
    !tipo_rede ||
    !nome_operacional ||
    !cnpj_escola ||
    !cep ||
    !endereco ||
    !cidade ||
    !uf ||
    !bairro ||
    !complemento ||
    !id_contrato
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const situacao = "ATIVO";
    const query =
      "INSERT INTO EntidadesEscolares (nome_contratual, tipo_rede, nome_operacional, cnpj_escola, cep, endereco, cidade, uf, bairro, complemento, id_contrato, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";
    const {
      rows: [registredEntidadesEscolares],
    } = await connection.query(query, [
      nome_contratual,
      tipo_rede,
      nome_operacional,
      cnpj_escola,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      id_contrato,
      situacao,
    ]);

    if (!registredEntidadesEscolares) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar a entidade escolar." });
    }
    const sitaucao = "ATIVO";
    const queryCount =
      "SELECT COUNT(*) FROM EntidadesEscolares WHERE id_contrato = $1 AND situacao = $2";
    const { rows } = await connection.query(queryCount, [
      id_contrato,
      sitaucao,
    ]);
    const count = rows[0].count;
    const updateDados = "UPDATE contratos SET QtdEscolas = $1 WHERE id = $2";
    await connection.query(updateDados, [count, id_contrato]);

    const entidadeEscolarId = registredEntidadesEscolares.id;

    if (id_usuarios_pg) {
      const queryInsertUser =
        "INSERT INTO AuxiliarUserEscolas(id_escola, id_usuario) VALUES ($1, $2)";

      await connection.query(queryInsertUser, [
        entidadeEscolarId,
        id_usuarios_pg,
      ]);
    }
    return res.status(201).json(registredEntidadesEscolares);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function updateEscolas(req, res) {
  const {
    id,
    condicao,
    nome_contratual,
    tipo_rede,
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    id_usuarios_pg,
  } = req.body;

  if (
    !id ||
    !condicao ||
    !nome_contratual ||
    !tipo_rede ||
    !nome_operacional ||
    !cnpj_escola ||
    !cep ||
    !endereco ||
    !cidade ||
    !uf ||
    !bairro ||
    !complemento
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const updateDados =
      "UPDATE EntidadesEscolares SET condicao = $1, nome_contratual = $2, tipo_rede = $3, nome_operacional = $4, cnpj_escola = $5, cep = $6, endereco = $7, cidade = $8, uf = $9, bairro = $10, complemento = $11 WHERE id = $12 RETURNING *";
    const { rowCount, rows: entidadeEdited } = await connection.query(
      updateDados,
      [
        condicao,
        nome_contratual,
        tipo_rede,
        nome_operacional,
        cnpj_escola,
        cep,
        endereco,
        cidade,
        uf,
        bairro,
        complemento,
        id,
      ]
    );
    if (id_usuarios_pg) {
      const queryInsertUser =
        "INSERT INTO AuxiliarUserEscolas(id_escola, id_usuario) VALUES ($1, $2)";

      await connection.query(queryInsertUser, [id, id_usuarios_pg]);
    }
    if (rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar o usuário." });
    }
    const dataEntidade = entidadeEdited;
    return res.status(200).json(dataEntidade);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deleteUserEscola(req, res) {
  const { userId, idEscola } = req.body;

  try {
    const deleteUserEscola =
      "DELETE FROM AuxiliarUserEscolas WHERE id_escola = $1 AND id_usuario = $2";
    await connection.query(deleteUserEscola, [idEscola, userId]);

    return res
      .status(200)
      .json({ message: "Usuário escola excluído com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findEntidadesEscolares(req, res) {
  const { id_contrato } = req.body;
  try {
    const situacao = "ATIVO";
    const query =
      "SELECT * FROM EntidadesEscolares WHERE id_contrato = $1 AND situacao = $2";
    const { rows } = await connection.query(query, [id_contrato, situacao]);

    const EntidadesEscolaresData = rows;

    return res.status(200).json(EntidadesEscolaresData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findEntidadeEscolar(req, res) {
  const { id } = req.body;
  try {
    const query = "SELECT * FROM EntidadesEscolares WHERE id = $1";
    const { rows } = await connection.query(query, [id]);

    const EntidadeEscolar = rows;

    return res.status(200).json(EntidadeEscolar);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findEntidadesEscolaresUserPDG(req, res) {
  const { userId } = req.body;
  try {
    const query = `
      SELECT EntidadesEscolares.* 
      FROM EntidadesEscolares
      JOIN AuxiliarUserEscolas ON EntidadesEscolares.id = AuxiliarUserEscolas.id_escola
      WHERE AuxiliarUserEscolas.id_usuario = $1 
    `;

    const { rows } = await connection.query(query, [userId]);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deleteEntidadeEscolar(req, res) {
  const { id_escola } = req.body;

  try {
    const situacao = "INATIVO";
    const deleteQueryEntidadesEscolares =
      "UPDATE entidadesescolares SET situacao = $1 WHERE id = $2 RETURNING *";
    const { rows } = await connection.query(deleteQueryEntidadesEscolares, [
      situacao,
      id_escola,
    ]);

    const deleteQueryPainelDados =
      "DELETE FROM AuxiliarUserEscolas WHERE id_escola = $1";
    await connection.query(deleteQueryPainelDados, [id_escola]);

    const sitaucao = "ATIVO";
    const queryCount =
      "SELECT COUNT(*) FROM EntidadesEscolares WHERE id_contrato = $1 AND situacao = $2";
    const { rows: contadora } = await connection.query(queryCount, [
      rows[0].id_contrato,
      sitaucao,
    ]);

    const count = contadora[0].count;
    const updateDados = "UPDATE contratos SET QtdEscolas = $1 WHERE id = $2";
    await connection.query(updateDados, [count, rows[0].id_contrato]);

    const updateEntidadeEscolar = rows;
    return res.status(200).json(updateEntidadeEscolar);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registerEntidadeEscolar,
  updateEscolas,
  deleteUserEscola,
  findEntidadesEscolares,
  findEntidadesEscolaresUserPDG,
  deleteEntidadeEscolar,
  findEntidadeEscolar,
};
