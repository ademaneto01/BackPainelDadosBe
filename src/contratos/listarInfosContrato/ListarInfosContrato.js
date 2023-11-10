const connection = require("../../connection");

async function ListarInfosContrato(req, res) {
  const { id } = req.query;

  try {
    const contractData = await fetchContractById(id);

    if (!contractData) {
      return sendErrorResponse(res, 400, "Infos. contrato não encontrado.");
    }

    return res.status(200).json([contractData]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchContractById(id) {
  const query = "SELECT * FROM infos_contrato WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [id]);

  return rows.length ? rows[0] : null;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarInfosContrato,
};
