const connection = require("../../connection");

const ATIVO_TRUE = true;
const ATIVO_FALSE = false;

const DELETED_TRUE = true;
const DELETED_FALSE = false;

async function SobreEscreverContrato(req, res) {
  const contratoData = req.body;

  if (!isValidData(contratoData)) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const contratos = await deactivateContract(contratoData.uuid_ec);

    const registredContract = await insertNewContract(
      contratoData,
      contratos[0].qtdescolas
    );

    if (!registredContract) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o contrato." });
    }

    const entidadesEscolares = await findEntidadesEscolares(
      contratoData.uuid_ec
    );

    await duplicateEntidadesEscolares(entidadesEscolares, registredContract.id);
    await deactivateEntidadesEscolares(entidadesEscolares);

    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

function isValidData(data) {
  const requiredFields = [
    "nome_simplificado",
    "razao_social",
    "cnpj_cont",
    "cep",
    "endereco",
    "cidade",
    "uf",
    "bairro",
    "complemento",
    "bo_rede",
  ];

  return requiredFields.every((field) => data[field]);
}

async function deactivateContract(uuid_ec) {
  const query =
    "UPDATE entidades_contratuais SET ativo = $1, deleted = $2 WHERE id = $3 RETURNING *";
  const { rows } = await connection.query(query, [
    ATIVO_FALSE,
    DELETED_TRUE,
    uuid_ec,
  ]);
  return rows;
}

async function insertNewContract(contratoData, qtdescolas) {
  const query = `INSERT INTO entidades_contratuais (nome_simplificado, razao_social, cnpj_cont, cep, endereco, cidade, uf, bairro, complemento, bo_rede, QtdEscolas, ativo, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`;
  const { rows } = await connection.query(query, [
    contratoData.nome_simplificado,
    contratoData.razao_social,
    contratoData.cnpj_cont,
    contratoData.cep,
    contratoData.endereco,
    contratoData.cidade,
    contratoData.uf,
    contratoData.bairro,
    contratoData.complemento,
    contratoData.bo_rede,
    qtdescolas,
    ATIVO_TRUE,
    DELETED_FALSE,
  ]);
  return rows[0] || null;
}

async function findEntidadesEscolares(uuid_ec) {
  const query =
    "SELECT * FROM  entidades_escolares WHERE uuid_ec = $1 AND ativo = $2 AND deleted = $3";
  const { rows } = await connection.query(query, [
    uuid_ec,
    ATIVO_TRUE,
    DELETED_FALSE,
  ]);
  return rows;
}

async function duplicateEntidadesEscolares(entidades, newContractId) {
  const queryDuplicarEntidades = `
        INSERT INTO entidades_escolares (
            nome_operacional, cnpj_escola, cep, endereco, cidade, uf, 
            bairro, complemento, uuid_ec, ativo, deleted
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

  for (let entidadeNew of entidades) {
    const { rows: inserindoNovaEntidade } = await connection.query(
      queryDuplicarEntidades,
      [
        entidadeNew.nome_operacional,
        entidadeNew.cnpj_escola,
        entidadeNew.cep,
        entidadeNew.endereco,
        entidadeNew.cidade,
        entidadeNew.uf,
        entidadeNew.bairro,
        entidadeNew.complemento,
        newContractId,
        ATIVO_TRUE,
        DELETED_FALSE,
      ]
    );

    const localizarUsersTabAuxiliar =
      "SELECT * FROM usuarios_pdg WHERE id_ee = $1";
    const { rowCount, rows: localizarUser } = await connection.query(
      localizarUsersTabAuxiliar,
      [entidadeNew.id]
    );

    if (rowCount > 0) {
      const alterandoIdEscolaUsuarioPedagogico =
        "INSERT INTO usuarios_pdg (id_usuario, id_ee) VALUES ($1, $2) RETURNING *";
      await connection.query(alterandoIdEscolaUsuarioPedagogico, [
        localizarUser[0].id_usuario,
        inserindoNovaEntidade[0].id,
      ]);
    }
  }
}

async function deactivateEntidadesEscolares(entidades) {
  const querySobreescreverEntidade = `
        UPDATE entidades_escolares 
        SET ativo = $1, deleted = $2 
        WHERE id = $3`;

  for (let entidade of entidades) {
    await connection.query(querySobreescreverEntidade, [
      ATIVO_FALSE,
      DELETED_TRUE,
      entidade.id,
    ]);
  }
}

module.exports = {
  SobreEscreverContrato,
};
