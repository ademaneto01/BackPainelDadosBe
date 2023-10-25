const connection = require("../../connection");

async function ListarDocsContrato(req, res) {
  const { uuid_ec } = req.body;

  try {
    const contractData = await fetchDocstByIdContrato(uuid_ec);

    if (!contractData) {
      return sendErrorResponse(res, 400, "Docs não encontrado.");
    }

    return res.status(200).json(contractData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchDocstByIdContrato(uuid_ec) {
  const query = "SELECT * FROM docs_contrato WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [uuid_ec]);

  return rows.length ? rows : null;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarDocsContrato,
};
