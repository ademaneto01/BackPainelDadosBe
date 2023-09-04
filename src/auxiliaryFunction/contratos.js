const connection = require("../connection");

async function registerContract(req, res) {
  const {
    nome_simplificado,
    razao_social,
    cnpj,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
  } = req.body;

  if (
    !nome_simplificado ||
    !razao_social ||
    !cnpj ||
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
    const situacao = "ATIVO";
    const query =
      "INSERT INTO contratos (nome_simplificado,razao_social,cnpj,cep,endereco,cidade,uf,bairro,complemento, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const {
      rows: [registredContract],
    } = await connection.query(query, [
      nome_simplificado,
      razao_social,
      cnpj,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      situacao,
    ]);

    if (!registredContract) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o contrato." });
    }

    return res.status(201).json(registredContract);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function updateContract(req, res) {
  const {
    id,
    nome_simplificado,
    razao_social,
    cnpj,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
  } = req.body;

  if (
    !nome_simplificado ||
    !razao_social ||
    !cnpj ||
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
      "UPDATE contratos SET nome_simplificado = $1, razao_social = $2, cnpj = $3, cep = $4, endereco = $5, cidade = $6, uf = $7, bairro = $8, complemento = $9 WHERE id = $10";
    const { rows, rowCount } = await connection.query(updateDados, [
      nome_simplificado,
      razao_social,
      cnpj,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      id,
    ]);

    if (rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar o usuário." });
    }
    const contractData = rows;
    return res.status(200).json(contractData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findContracts(req, res) {
  try {
    const situacao = "ATIVO";
    const query = "SELECT * FROM contratos WHERE situacao = $1";
    const { rows } = await connection.query(query, [situacao]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findOneContract(req, res) {
  const { id } = req.body;
  try {
    const query = "SELECT * FROM contratos WHERE id = $1";
    const { rows } = await connection.query(query, [id]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deleteContrato(req, res) {
  const { id_contrato } = req.body;

  try {
    const situacao = "INATIVO";
    const query = "SELECT * FROM EntidadesEscolares WHERE id_contrato = $1";
    const { rowCount } = await connection.query(query, [id_contrato]);

    if (rowCount > 0) {
      const deleteQueryEntidadesEscolares =
        "UPDATE EntidadesEscolares SET situacao = $1 WHERE id_contrato = $2";
      await connection.query(deleteQueryEntidadesEscolares, [
        situacao,
        id_contrato,
      ]);
    }

    const queryUpdateContrato =
      "UPDATE contratos SET situacao = $1 WHERE id = $2 RETURNING *";
    const { rows } = await connection.query(queryUpdateContrato, [
      situacao,
      id_contrato,
    ]);
    const contratos = rows;
    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function sobreescreverContrato(req, res) {
  const {
    id_contrato,
    nome_simplificado,
    razao_social,
    cnpj,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
  } = req.body;

  if (
    !nome_simplificado ||
    !razao_social ||
    !cnpj ||
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
    //SOBREESCREVER CONTRATO
    const situacao = "SOBREESCRITO";
    const query = "UPDATE contratos SET situacao = $1 WHERE id = $2";

    const { rows: contratos } = await connection.query(query, [
      situacao,
      id_contrato,
    ]);

    //INSERIR DADOS NOVO CONTRATO

    const situacaoCadastro = "ATIVO";
    const queryCadastroContrato =
      "INSERT INTO contratos (nome_simplificado,razao_social,cnpj,cep,endereco,cidade,uf,bairro,complemento, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const {
      rows: [registredContract],
    } = await connection.query(queryCadastroContrato, [
      nome_simplificado,
      razao_social,
      cnpj,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      situacaoCadastro,
    ]);

    if (!registredContract) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o contrato." });
    }

    //ENCONTRAR ENTIDADES ESCOLARES RELACIONADAS AO CONTRATO

    const situacaoEntidadesEscolares = "ATIVO";
    const queryLocalicarEntidadesEscolares =
      "SELECT * FROM EntidadesEscolares WHERE id_contrato = $1 AND situacao = $2";
    const { rows: LocalizarEntidadesEscolares } = await connection.query(
      queryLocalicarEntidadesEscolares,
      [id_contrato, situacaoEntidadesEscolares]
    );

    //DUPLICAR ENTIDADES

    const situacaoRegistrarEntidade = "ATIVO";
    const queryDuplicarEntidades =
      "INSERT INTO EntidadesEscolares (nome_contratual, tipo_rede, nome_operacional, cnpj_escola, cep, endereco, cidade, uf, bairro, complemento, id_contrato, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";

    for (let entidadeNew of LocalizarEntidadesEscolares) {
      const { rows: inserindoNovaEntidade } = await connection.query(
        queryDuplicarEntidades,
        [
          entidadeNew.nome_contratual,
          entidadeNew.tipo_rede,
          entidadeNew.nome_operacional,
          entidadeNew.cnpj_escola,
          entidadeNew.cep,
          entidadeNew.endereco,
          entidadeNew.cidade,
          entidadeNew.uf,
          entidadeNew.bairro,
          entidadeNew.complemento,
          registredContract.id,
          situacaoRegistrarEntidade,
        ]
      );

      const localizarUsersTabAuxiliar =
        "SELECT * FROM AuxiliarUserEscolas WHERE id_escola = $1";
      const { rowCount, rows: localizarUser } = await connection.query(
        localizarUsersTabAuxiliar,
        [entidadeNew.id]
      );

      if (rowCount > 0) {
        const alterandoIdEscolaUsuarioPedagogico =
          "INSERT INTO AuxiliarUserEscolas (id_usuario, id_escola) VALUES ($1, $2) RETURNING *";
        await connection.query(alterandoIdEscolaUsuarioPedagogico, [
          localizarUser[0].id_usuario,
          inserindoNovaEntidade[0].id,
        ]);
      }
    }

    //SOBREESCREVER ENTIDADES ESCOLARES

    const situacaoSobreescreverEntidadesEscolares = "SOBREESCRITO";
    const querySobreescreverEntidade =
      "UPDATE EntidadesEscolares SET situacao = $1 WHERE id = $2";

    for (let entidade of LocalizarEntidadesEscolares) {
      await connection.query(querySobreescreverEntidade, [
        situacaoSobreescreverEntidadesEscolares,
        entidade.id,
      ]);
    }

    return res.status(200).json({ mensagem: "sobreescrito com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registerContract,
  updateContract,
  findContracts,
  deleteContrato,
  findOneContract,
  sobreescreverContrato,
};
