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
    if (entidadesEscolares.length > 0) {
      await updateEntidadesEscolares(entidadesEscolares, registredContract.id);
    }

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
  const query = `INSERT INTO entidades_contratuais (nome_simplificado, razao_social, cnpj_cont, cep, endereco, cidade, uf, bairro, complemento, tipocontrato, valorcontrato, bo_rede, QtdEscolas, ativo, deleted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`;
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
    contratoData.tipocontrato,
    contratoData.valorcontrato,
    contratoData.bo_rede,
    qtdescolas,
    ATIVO_TRUE,
    DELETED_FALSE,
  ]);
  return rows[0] || null;
}

async function findEntidadesEscolares(uuid_ec) {
  const query = "SELECT * FROM  entidades_escolares WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [uuid_ec]);
  return rows;
}

async function updateEntidadesEscolares(entidades, newContractId) {
  const queryDuplicarEntidades = `
    UPDATE entidades_escolares 
    SET uuid_ec = $1
    WHERE id = $2`;

  for (let entidadeNew of entidades) {
    await connection.query(queryDuplicarEntidades, [
      newContractId,
      entidadeNew.id,
    ]);
  }
}

module.exports = {
  SobreEscreverContrato,
};
