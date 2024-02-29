const connection = require("../../connection");

async function DeletarDocContrato(req, res) {
  const { id } = req.body;

  try {
    doc = await getDocById(id);
    if (!doc) {
      return sendErrorResponse(res, 404, "Documento não encontrado.");
    }

    await deleteDoc(id);

    return res
      .status(204)
      .json({ mensagem: "Doc Contrato deletado com sucesso..." });
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha DeletarDocContrato");
  }
}

async function getDocById(id) {
  const selectQuery = "SELECT * FROM docs_contrato WHERE id = $1";
  const { rows } = await connection.query(selectQuery, [id]);
  return rows[0];
}

async function deleteDoc(id) {
  const queryUsuario = "DELETE FROM docs_contrato WHERE id = $1";
  await connection.query(queryUsuario, [id]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  DeletarDocContrato,
};
