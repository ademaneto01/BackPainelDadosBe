const connection = require("../connection");

async function registrarEntidadeContratual(req, res) {
  const {
    nome_simplificado,
    razao_social,
    cnpj_cont,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    bo_rede,
    ativo,
  } = req.body;

  if (
    !nome_simplificado ||
    !razao_social ||
    !cnpj_cont ||
    !cep ||
    !endereco ||
    !cidade ||
    !uf ||
    !bairro ||
    !complemento ||
    !bo_rede ||
    !ativo
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const query =
      "INSERT INTO entidades_contratuais (nome_simplificado,razao_social,cnpj_cont,cep,endereco,cidade,uf,bairro,complemento, ativo, bo_rede) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
    const {
      rows: [registredContract],
    } = await connection.query(query, [
      nome_simplificado,
      razao_social,
      cnpj_cont,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      ativo,
      bo_rede,
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

async function editarEntidadeContratual(req, res) {
  const {
    id,
    nome_simplificado,
    razao_social,
    cnpj_cont,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
    ativo,
    bo_rede,
  } = req.body;

  if (
    !nome_simplificado ||
    !razao_social ||
    !cnpj_cont ||
    !cep ||
    !endereco ||
    !cidade ||
    !uf ||
    !bairro ||
    !complemento ||
    !ativo ||
    !bo_rede
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const updateDados =
      "UPDATE entidades_contratuais SET nome_simplificado = $1, razao_social = $2, cnpj_cont = $3, cep = $4, endereco = $5, cidade = $6, uf = $7, bairro = $8, complemento = $9, ativo = $10, bo_rede = $11 WHERE id = $12";
    const { rows, rowCount } = await connection.query(updateDados, [
      nome_simplificado,
      razao_social,
      cnpj_cont,
      cep,
      endereco,
      cidade,
      uf,
      bairro,
      complemento,
      ativo,
      bo_rede,
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

async function localizarContratos(req, res) {
  try {
    const ativo = true;
    const query = "SELECT * FROM entidades_contratuais WHERE ativo = $1";
    const { rows } = await connection.query(query, [ativo]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarContrato(req, res) {
  const { id } = req.body;
  try {
    const query = "SELECT * FROM entidade_contratuais WHERE id = $1";
    const { rows } = await connection.query(query, [id]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deletarContrato(req, res) {
  const { uuid_ec } = req.body;

  try {
    const ativo = false;
    const query = "SELECT * FROM entidades_escolares WHERE uuid_ec = $1";
    const { rowCount } = await connection.query(query, [uuid_ec]);

    if (rowCount > 0) {
      const deleteQueryEntidadesEscolares =
        "UPDATE entidades_escolares SET ativo = $1 WHERE uuid_ec = $2";
      await connection.query(deleteQueryEntidadesEscolares, [ativo, uuid_ec]);
    }

    const queryUpdateContrato =
      "UPDATE entidades_contratuais SET ativo = $1 WHERE id = $2 RETURNING *";
    const { rows } = await connection.query(queryUpdateContrato, [
      ativo,
      uuid_ec,
    ]);
    const contratos = rows;
    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function sobreescreverContrato(req, res) {
  const {
    uuid_ec,
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
    const ativo = false;
    const query =
      "UPDATE entidades_contratuais SET ativo = $1 WHERE id = $2 RETURNING *";

    const { rows: contratos } = await connection.query(query, [ativo, uuid_ec]);

    //INSERIR DADOS NOVO CONTRATO

    const situacaoCadastro = true;
    const queryCadastroContrato =
      "INSERT INTO entidades_contratuais (nome_simplificado,razao_social,cnpj,cep,endereco,cidade,uf,bairro,complemento, ativo, QtdEscolas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
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
      contratos[0].qtdescolas,
    ]);

    if (!registredContract) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o contrato." });
    }

    //ENCONTRAR ENTIDADES ESCOLARES RELACIONADAS AO CONTRATO

    const situacaoEntidadesEscolares = true;
    const queryLocalicarEntidadesEscolares =
      "SELECT * FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
    const { rows: LocalizarEntidadesEscolares } = await connection.query(
      queryLocalicarEntidadesEscolares,
      [uuid_ec, situacaoEntidadesEscolares]
    );

    //DUPLICAR ENTIDADES ESCOLARES

    const situacaoRegistrarEntidade = true;
    const queryDuplicarEntidades =
      "INSERT INTO entidades_escolares (nome_contratual, tipo_rede, nome_operacional, cnpj_escola, cep, endereco, cidade, uf, bairro, complemento, uuid_ec, ativo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *";

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

      // const localizarUsersTabAuxiliar =
      //   "SELECT * FROM AuxiliarUserEscolas WHERE id_escola = $1";
      // const { rowCount, rows: localizarUser } = await connection.query(
      //   localizarUsersTabAuxiliar,
      //   [entidadeNew.id]
      // );

      // if (rowCount > 0) {
      //   const alterandoIdEscolaUsuarioPedagogico =
      //     "INSERT INTO AuxiliarUserEscolas (id_usuario, id_escola) VALUES ($1, $2) RETURNING *";
      //   await connection.query(alterandoIdEscolaUsuarioPedagogico, [
      //     localizarUser[0].id_usuario,
      //     inserindoNovaEntidade[0].id,
      //   ]);
      // }
    }

    //SOBREESCREVER ENTIDADES ESCOLARES

    const situacaoSobreescreverEntidadesEscolares = false;
    const querySobreescreverEntidade =
      "UPDATE entidades_escolares SET ativo = $1 WHERE id = $2";

    for (let entidade of LocalizarEntidadesEscolares) {
      await connection.query(querySobreescreverEntidade, [
        situacaoSobreescreverEntidadesEscolares,
        entidade.id,
      ]);
    }

    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registrarEntidadeContratual,
  editarEntidadeContratual,
  localizarContratos,
  deletarContrato,
  localizarContrato,
  sobreescreverContrato,
};
