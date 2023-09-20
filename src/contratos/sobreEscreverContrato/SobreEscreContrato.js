const connection = require("../../connection");

const ATIVO = false;
const DELETED = true;

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
  const { rows } = await connection.query(query, [ATIVO, DELETED, uuid_ec]);
  return rows;
}

async function insertNewContract(contratoData, qtdescolas) {
  const situacaoRegistrarEntidade = true;
  const deletedFalseParaInsert = false;
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
    situacaoRegistrarEntidade,
    deletedFalseParaInsert,
  ]);
  return rows[0] || null;
}

async function findEntidadesEscolares(uuid_ec) {
  const query =
    "SELECT * FROM  entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
  const { rows } = await connection.query(query, [uuid_ec, ATIVO]);
  return rows;
}

async function duplicateEntidadesEscolares(entidades, newContractId) {
  const queryDuplicarEntidades = `
        INSERT INTO entidades_escolares (
            nome_operacional, cnpj_escola, cep, endereco, cidade, uf, 
            bairro, complemento, uuid_ec, ativo, deleted
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

  const situacaoRegistrarEntidade = true;
  const deletedFalseParaInsert = false;

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
        situacaoRegistrarEntidade,
        deletedFalseParaInsert,
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
  const situacaoSobreescreverEntidadesEscolares = false;
  const setarParaDeletado = true;
  const querySobreescreverEntidade = `
        UPDATE entidades_escolares 
        SET ativo = $1, deleted = $2 
        WHERE id = $3`;

  for (let entidade of entidades) {
    await connection.query(querySobreescreverEntidade, [
      situacaoSobreescreverEntidadesEscolares,
      setarParaDeletado,
      entidade.id,
    ]);
  }
}

module.exports = {
  SobreEscreverContrato,
};
