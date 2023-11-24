const connection = require("../../connection");

async function ListarTurmas(req, res) {
  const { id_ee } = req.query;

  try {
    const turmasAlunados = await fetchListarTurmas(id_ee);

    if (turmasAlunados.length <= 0) {
      return sendErrorResponse(
        res,
        404,
        "Ainda não existem Turmas cadastradas..."
      );
    }

    return res.status(200).json(turmasAlunados);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchListarTurmas(id_ee) {
  const query = "SELECT * FROM turmas_alunados WHERE id_ee = $1";
  const { rows } = await connection.query(query, [id_ee]);

  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarTurmas,
};
