const connection = require("../../connection");

async function markEntidadeAsDeleted(id) {
  const DELETE_FLAG = true;
  const ACTIVE_FLAG = false;
  const query =
    "UPDATE entidades_escolares SET deleted = $1 , ativo = $2 WHERE id = $3 RETURNING *";
  const { rows } = await connection.query(query, [
    DELETE_FLAG,
    ACTIVE_FLAG,
    id,
  ]);
  return rows[0];
}

async function removeUsuarioPdg(id) {
  const query = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
  await connection.query(query, [id]);
}

async function removePainelDados(id) {
  const query = "DELETE FROM painel_dados WHERE id_ee = $1";
  await connection.query(query, [id]);
}

async function deleteUser(id) {
  const query = "DELETE FROM usuarios WHERE id_ee = $1";
  await connection.query(query, [id]);
}

async function updateQtdEscolas(uuid_ec) {
  const ACTIVE_STATUS = true;
  const query =
    "SELECT COUNT(*) FROM entidades_escolares WHERE uuid_ec = $1 AND ativo = $2";
  const { rows } = await connection.query(query, [uuid_ec, ACTIVE_STATUS]);

  const count = rows[0].count;
  const updateQuery =
    "UPDATE entidades_contratuais SET qtdEscolas = $1 WHERE id = $2";
  await connection.query(updateQuery, [count, uuid_ec]);
}

async function DeletarEntidadeEscolar(req, res) {
  const { id } = req.body;

  try {
    const updatedEntidade = await markEntidadeAsDeleted(id);
    await removeUsuarioPdg(id);
    await removePainelDados(id);
    await updateQtdEscolas(updatedEntidade.uuid_ec);
    await deleteUser(id);

    return res
      .status(204)
      .json({ mensagem: "Entidade deletada com sucesso..." });
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha DeletarEntidadeEscolar." });
  }
}

module.exports = {
  DeletarEntidadeEscolar,
};
