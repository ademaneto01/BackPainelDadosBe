const connection = require("../../connection");

async function ListarInfosContrato(req, res) {
  const { uuid_ec } = req.body;

  try {
    const contractData = await fetchContractById(uuid_ec);

    if (!contractData) {
      return sendErrorResponse(res, 200, "Contrato não encontrado.");
    }

    return res.status(200).json([contractData]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchContractById(uuid_ec) {
  const query = "SELECT * FROM infos_contrato WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [uuid_ec]);

  return rows.length ? rows[0] : null;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarInfosContrato,
};