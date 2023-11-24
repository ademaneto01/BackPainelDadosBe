const connection = require("../../connection");

async function ListarAlunados(req, res) {
  const { id_ee } = req.query;

  try {
    const alunados = await fetchListarAlunados(id_ee);

    if (alunados.length <= 0) {
      return sendErrorResponse(
        res,
        404,
        "Ainda não existem Alunos cadastrados..."
      );
    }

    return res.status(200).json(alunados);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchListarAlunados(id_ee) {
  const query = "SELECT * FROM alunados WHERE id_ee = $1";
  const { rows } = await connection.query(query, [id_ee]);

  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarAlunados,
};
