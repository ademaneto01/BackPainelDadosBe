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

module.exports = {
  registerContract,
  updateContract,
  findContracts,
  deleteContrato,
  findOneContract,
};
