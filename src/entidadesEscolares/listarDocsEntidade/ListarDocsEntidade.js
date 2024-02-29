const connection = require("../../connection");

async function ListarDocsEntidade(req, res) {
  const { id } = req.query;

  try {
    const docsEntidadetData = await fetchDocstByIdEntidade(id);

    if (!docsEntidadetData) {
      return sendErrorResponse(res, 404, "Ainda não existe Docs cadastrado...");
    }

    return res.status(200).json(docsEntidadetData);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha ListarDocsEntidade");
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
