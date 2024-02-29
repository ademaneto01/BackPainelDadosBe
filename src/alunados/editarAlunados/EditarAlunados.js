const connection = require("../../connection");

async function EditarAlunados(req, res) {
  const data = req.body;

  try {
    const registredAlunado = await editAlunados(data);

    if (!registredAlunado) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário." });
    }

    return res.status(201).json(registredAlunado);
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha editarAlunados" });
  }
}

async function editAlunados(data) {
  const dadosAlunados = {};
  const dadosTurmas = {};

  for (const key in data) {
    if (key.startsWith("ALUNADOS_")) {
      dadosAlunados[key.replace("ALUNADOS_", "")] = data[key];
    } else if (key.startsWith("TURMAS_")) {
      dadosTurmas[key.replace("TURMAS_", "")] = data[key];
    }
  }

  const editedAlunados = await atualizarDadosTabelas(
    dadosAlunados,
    dadosTurmas,
    data
  );

  return editedAlunados;
}
async function atualizarDadosTabelas(dadosAlunados, dadosTurmas, data) {
  const queryUpdateAlunados = `
      UPDATE alunados SET 
        "3EI" = $3, "4EI" = $4, "5EI" = $5, "1EF" = $6, "2EF" = $7, "3EF" = $8, "4EF" = $9, "5EF" = $10, 
        "6EF" = $11, "7EF" = $12, "8EF" = $13, "9EF" = $14, "1EM" = $15, "2EM" = $16, "3EM" = $17
      WHERE id_ee = $1 AND ano_ref = $2
      RETURNING *`;
  await connection.query(queryUpdateAlunados, [
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

  const queryUpdateTurmas = `
      UPDATE turmas_alunados SET 
        "3EI" = $3, "4EI" = $4, "5EI" = $5, "1EF" = $6, "2EF" = $7, "3EF" = $8, "4EF" = $9, "5EF" = $10, 
        "6EF" = $11, "7EF" = $12, "8EF" = $13, "9EF" = $14, "1EM" = $15, "2EM" = $16, "3EM" = $17
      WHERE id_ee = $1 AND ano_ref = $2
      RETURNING *`;
  await connection.query(queryUpdateTurmas, [
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
  EditarAlunados,
};
