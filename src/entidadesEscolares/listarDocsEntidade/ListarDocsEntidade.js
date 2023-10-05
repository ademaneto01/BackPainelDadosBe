const connection = require("../../connection");

async function ListarDocsEntidade(req, res) {
  const { uuid_ee } = req.body;

  try {
    const docsEntidadetData = await fetchDocstByIdEntidade(uuid_ee);

    if (!docsEntidadetData) {
      return sendErrorResponse(res, 404, "Docs não encontrado.");
    }

    return res.status(200).json(docsEntidadetData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function fetchDocstByIdEntidade(uuid_ee) {
  const query = "SELECT * FROM docs_entidades_escolares WHERE id_ee = $1";
  const { rows } = await connection.query(query, [uuid_ee]);

  return rows.length ? rows : null;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  ListarDocsEntidade,
};
