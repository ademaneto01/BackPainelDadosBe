const connection = require("../../connection");

async function ListarIndividualTurmas(req, res) {
  const { id } = req.query;
  const dataObj = JSON.parse(decodeURIComponent(id));

  try {
    const turmasIndividual = await fetchListarIndividualTurmas(dataObj);

    if (turmasIndividual.length <= 0) {
      return sendErrorResponse(
        res,
        404,
        "Ainda não existem Dados cadastrados para o ano de Ref...."
      );
    }

    return res.status(200).json(turmasIndividual);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchListarIndividualTurmas(dataObj) {
  const query =
    "SELECT * FROM turmas_alunados WHERE id_ee = $1 AND ano_ref = $2";
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
  ListarIndividualTurmas,
};
