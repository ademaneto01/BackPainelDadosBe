const connection = require("../../connection");

const DELETED_STATUS = true;
const INACTIVE_STATUS = false;

async function DeletarContrato(req, res) {
  const { uuid_ec } = req.body;

  try {
    await deleteRelatedEntities(uuid_ec);
    await updateEntidadesContratuaisStatus(uuid_ec);

    return res
      .status(204)
      .json({ mensagem: "Contrato deletado com sucesso..." });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deleteRelatedEntities(uuid_ec) {
  const entidadeEscolar = await fetchEntidadesEscolares(uuid_ec);

  if (entidadeEscolar) {
    await deleteUser(entidadeEscolar);
    await setEntidadesEscolaresStatus(uuid_ec);
    await deleteVinculosAgenteExterno(entidadeEscolar);
    await deleteUserPdgRelations(entidadeEscolar);
    await deletePainelDadosRelations(entidadeEscolar);
  }
}

async function fetchEntidadesEscolares(uuid_ec) {
  const query = "SELECT * FROM entidades_escolares WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [uuid_ec]);

  return rows || null;
}

async function deleteUser(entidadeEscolar) {
  const query = "DELETE FROM usuarios WHERE id_ee = $1";
  for (const entidade of entidadeEscolar) {
    await connection.query(query, [entidade.id]);
  }
}

async function setEntidadesEscolaresStatus(uuid_ec) {
  const query =
    "UPDATE entidades_escolares SET deleted = $1, ativo = $2 WHERE uuid_ec = $3";
  await connection.query(query, [DELETED_STATUS, INACTIVE_STATUS, uuid_ec]);
}

async function deleteUserPdgRelations(entidadeEscolar) {
  const query = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
  for (const entidade of entidadeEscolar) {
    await connection.query(query, [entidade.id]);
  }
}

async function deleteVinculosAgenteExterno(entidadeEscolar) {
  const query = "DELETE FROM vinculos_agentes_externos WHERE id_escola = $1";
  for (const entidade of entidadeEscolar) {
    await connection.query(query, [entidade.id]);
  }
}

async function deletePainelDadosRelations(entidadeEscolar) {
  const query = "DELETE FROM painel_dados WHERE id_ee = $1";
  for (const entidade of entidadeEscolar) {
    await connection.query(query, [entidade.id]);
  }
}

async function updateEntidadesContratuaisStatus(uuid_ec) {
  const query =
    "UPDATE entidades_contratuais SET deleted = $1, ativo = $2 WHERE id = $3";
  await connection.query(query, [DELETED_STATUS, INACTIVE_STATUS, uuid_ec]);
}

module.exports = {
  DeletarContrato,
};
