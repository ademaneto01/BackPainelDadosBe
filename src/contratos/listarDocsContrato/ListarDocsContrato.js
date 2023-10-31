const connection = require("../../connection");

async function ListarDocsContrato(req, res) {
  const { id } = req.query;

  try {
    const contractData = await fetchDocstByIdContrato(id);

    if (!contractData) {
      return sendErrorResponse(res, 400, "Ainda não existe Docs cadastrado...");
    }

    return res.status(200).json(contractData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchDocstByIdContrato(id) {
  const query = "SELECT * FROM docs_contrato WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [id]);

  return rows.length ? rows : null;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarDocsContrato,
};
