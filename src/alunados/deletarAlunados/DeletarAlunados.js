const connection = require("../../connection");

async function DeletarAlunados(req, res) {
  const data = req.body;

  try {
    await deleteAlunados(data);
    await deleteTurmas(data);
    return res
      .status(200)
      .json({ mensagem: "Turmas e Alunos deletados com sucesso..." });
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function deleteAlunados(data) {
  const queryAlunados = "DELETE FROM alunados WHERE id = $1";
  await connection.query(queryAlunados, [data.id_alunado]);
}

async function deleteTurmas(data) {
  const queryTurmas = "DELETE FROM turmas_alunados WHERE id = $1";
  await connection.query(queryTurmas, [data.id_turmas]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarAlunados,
};
