const connection = require("../../connection");

async function DeletarInfosContrato(req, res) {
  const { id } = req.body;

  try {
    Infosdoc = await getInfosDocById(id);
    if (!Infosdoc) {
      return sendErrorResponse(res, 404, "Documento não encontrado.");
    }

    await deleteInfosDoc(id);

    return res.status(200).json([Infosdoc]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getInfosDocById(id) {
  const selectQuery = "SELECT * FROM infos_contrato WHERE id = $1";
  const { rows } = await connection.query(selectQuery, [id]);
  return rows[0];
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
