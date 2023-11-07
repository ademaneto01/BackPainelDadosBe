const connection = require("../../connection");

async function LocalizarContratos(req, res) {
  try {
    const contractsData = await fetchContracts();
    if (!contractsData) {
      return sendErrorResponse(
        res,
        400,
        "Ainda não existe Contratos cadastrado..."
      );
    }
    return res.status(200).json(contractsData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchContracts() {
  const deleted = false;
  const query = "SELECT * FROM entidades_contratuais WHERE deleted = $1";
  const { rows } = await connection.query(query, [deleted]);
  return rows;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  LocalizarContratos,
};
