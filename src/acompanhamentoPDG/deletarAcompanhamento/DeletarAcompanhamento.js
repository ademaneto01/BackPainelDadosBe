const connection = require("../../connection");

const DELETED_STATUS = true;

async function DeletarAcompanhamento(req, res) {
  const { id } = req.body;

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
