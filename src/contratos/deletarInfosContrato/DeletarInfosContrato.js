const connection = require("../../connection");

async function DeletarInfosContrato(req, res) {
  const { id } = req.body;

  try {
    await deleteInfosDoc(id);

    return res
      .status(204)
      .json({ mensagem: "Infos contrato deletada com sucesso..." });
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha DeletarInfosContrato");
  }
}

async function deleteInfosDoc(id) {
  const queryUsuario = "DELETE FROM infos_contrato WHERE id = $1";
  await connection.query(queryUsuario, [id]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarInfosContrato,
};
