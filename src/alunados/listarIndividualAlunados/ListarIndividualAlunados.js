const connection = require("../../connection");

async function ListarIndividualAlunados(req, res) {
  const { id } = req.query;
  const dataObj = JSON.parse(decodeURIComponent(id));

  try {
    const alunadosIndividual = await fetchListarIndividualAlunados(dataObj);

    if (alunadosIndividual.length <= 0) {
      return sendErrorResponse(
        res,
        404,
        "Ainda não existem Alunos cadastrados..."
      );
    }

    return res.status(200).json(alunadosIndividual);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchListarIndividualAlunados(dataObj) {
  const query = "SELECT * FROM alunados WHERE id_ee = $1 AND ano_ref = $2";
  const { rows } = await connection.query(query, [
    dataObj.id_ee,
    dataObj.ano_ref,
  ]);

  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarIndividualAlunados,
};
