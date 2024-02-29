const connection = require("../../connection");

async function RegistrarAlunados(req, res) {
  const data = req.body;

  try {
    const queryJoinAlunados = `
    SELECT * FROM alunados WHERE id_ee = $1 AND ano_ref = $2`;

    const { rows: findAlunados } = await connection.query(queryJoinAlunados, [
      data.id_ee,
      data.ano_ref,
    ]);

    const queryJoinTurmas = `
    SELECT * FROM alunados WHERE id_ee = $1 AND ano_ref = $2`;

    const { rows: findTurmas } = await connection.query(queryJoinTurmas, [
      data.id_ee,
      data.ano_ref,
    ]);

    if (findTurmas.length > 0 || findAlunados.length > 0) {
      return res.status(400).json({
        mensagem: "Já existem dados cadastrados para o ano de referência",
      });
    }
    const registredAlunado = await inserirAlunados(data);

    if (!registredAlunado) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário." });
    }

    return res.status(201).json(registredAlunado);
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha RegistrarAlunados" });
  }
}

async function inserirAlunados(data) {
  const dadosAlunados = {};
  const dadosTurmas = {};

  for (const key in data) {
    if (key.startsWith("ALUNADOS_")) {
      dadosAlunados[key.replace("ALUNADOS_", "")] = data[key];
    } else if (key.startsWith("TURMAS_")) {
      dadosTurmas[key.replace("TURMAS_", "")] = data[key];
    }
  }

  const registeredAlunados = await inserirNaTabela(
    dadosAlunados,
    dadosTurmas,
    data
  );

  return registeredAlunados;
}

async function inserirNaTabela(dadosAlunados, dadosTurmas, data) {
  const queryAlunados =
    'INSERT INTO alunados (id_ee, ano_ref, "3EI", "4EI", "5EI", "1EF", "2EF", "3EF", "4EF", "5EF", "6EF", "7EF", "8EF", "9EF", "1EM", "2EM", "3EM") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *';
  await connection.query(queryAlunados, [
    data.id_ee,
    data.ano_ref,
    dadosAlunados["3EI"],
    dadosAlunados["4EI"],
    dadosAlunados["5EI"],
    dadosAlunados["1EF"],
    dadosAlunados["2EF"],
    dadosAlunados["3EF"],
    dadosAlunados["4EF"],
    dadosAlunados["5EF"],
    dadosAlunados["6EF"],
    dadosAlunados["7EF"],
    dadosAlunados["8EF"],
    dadosAlunados["9EF"],
    dadosAlunados["1EM"],
    dadosAlunados["2EM"],
    dadosAlunados["3EM"],
  ]);

  const queryTurmas =
    'INSERT INTO turmas_alunados (id_ee, ano_ref, "3EI", "4EI", "5EI", "1EF", "2EF", "3EF", "4EF", "5EF", "6EF", "7EF", "8EF", "9EF", "1EM", "2EM", "3EM") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *';
  await connection.query(queryTurmas, [
    data.id_ee,
    data.ano_ref,
    dadosTurmas["3EI"],
    dadosTurmas["4EI"],
    dadosTurmas["5EI"],
    dadosTurmas["1EF"],
    dadosTurmas["2EF"],
    dadosTurmas["3EF"],
    dadosTurmas["4EF"],
    dadosTurmas["5EF"],
    dadosTurmas["6EF"],
    dadosTurmas["7EF"],
    dadosTurmas["8EF"],
    dadosTurmas["9EF"],
    dadosTurmas["1EM"],
    dadosTurmas["2EM"],
    dadosTurmas["3EM"],
  ]);

  const queryJoin = `
  SELECT * FROM alunados WHERE id_ee = $1 AND ano_ref = $2`;

  const { rows } = await connection.query(queryJoin, [
    data.id_ee,
    data.ano_ref,
  ]);

  return rows;
}

module.exports = {
  RegistrarAlunados,
};
