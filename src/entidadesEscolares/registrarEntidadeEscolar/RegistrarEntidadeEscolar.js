const connection = require("../../connection");

async function insertEntidadeEscolar(data) {
  const query = `
      INSERT INTO entidades_escolares (
        nome_operacional, cnpj_escola, cep, endereco, cidade, uf, 
        bairro, complemento, ativo, uuid_ec, deleted
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
      RETURNING *`;
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
    data.uuid_ec,
    false,
  ];

  const {
    rows: [registredEntidadesEscolares],
  } = await connection.query(query, values);
  return registredEntidadesEscolares;
}

async function insertUrlDados(id_ee, url_dados) {
  const query = "INSERT INTO painel_dados(id_ee, url_dados) VALUES ($1, $2)";
  await connection.query(query, [id_ee, url_dados]);
}

async function updateQtdEscolas(uuid_ec, active = true) {
  const queryCount =
    "SELECT COUNT(*) FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
  const { rows } = await connection.query(queryCount, [uuid_ec, active]);
  const count = rows[0].count;

  const updateDados =
    "UPDATE entidades_contratuais SET qtdEscolas = $1 WHERE id = $2";
  await connection.query(updateDados, [count, uuid_ec]);
}

async function insertUsuario(id_ee, id_usuario) {
  const query = "INSERT INTO usuarios_pdg(id_ee, id_usuario) VALUES ($1, $2)";
  await connection.query(query, [id_ee, id_usuario]);
}

async function RegistrarEntidadeEscolar(req, res) {
  const {
    nome_operacional,
    cnpj_escola,
    cep,
    endereco,
    cidade,
    uf,
    bairro,
    complemento,
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
    const registredEntidadesEscolares = await insertEntidadeEscolar(req.body);
    await insertUrlDados(registredEntidadesEscolares.id, url_dados);
    await updateQtdEscolas(uuid_ec);

    if (id_usuario_pdg) {
      await insertUsuario(registredEntidadesEscolares.id, id_usuario_pdg);
    }

    return res.status(201).json([registredEntidadesEscolares]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  RegistrarEntidadeEscolar,
};
