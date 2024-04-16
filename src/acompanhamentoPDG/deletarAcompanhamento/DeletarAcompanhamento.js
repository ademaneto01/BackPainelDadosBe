const connection = require("../../connection");
const criarArquivo = require("../../logger/logger");

const DELETED_STATUS = true;

async function DeletarAcompanhamento(req, res) {
  const { id } = req.body;
  try {
    const queryLocalizarA = "SELECT * FROM acompanhamento_pdg a WHERE a.id = $1"
    const {rows} = await connection.query(queryLocalizarA, [id]);
    const userId = rows[0].id_user
    await criarArquivo('DeletarAcompanhamento', userId);
  } catch (error) {
    sendErrorResponse(res, 400, `Error no logger ${error.message}`);
  }
  try {
    await logicalDeletionAcomppanhamento(id);
    return res
      .status(204)
      .json({ mensagem: "Acompanhamento deletado com sucesso..." });
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha DeletarAcompanhamento" });
  }
}

async function logicalDeletionAcomppanhamento(id) {
  const query = "UPDATE acompanhamento_pdg SET deleted = $1 WHERE id = $2";
  await connection.query(query, [DELETED_STATUS, id]);
}

module.exports = {
  DeletarAcompanhamento,
};
