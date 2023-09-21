const connection = require("../../connection");

const DELETED_STATUS = true;
const INACTIVE_STATUS = false;

async function DeletarContrato(req, res) {
  const { uuid_ec } = req.body;

  try {
    await deleteRelatedEntities(uuid_ec);
    await updateEntidadesContratuaisStatus(uuid_ec);

    const contratos = await fetchUpdatedContract(uuid_ec);

    return res.status(200).json(contratos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function deleteRelatedEntities(uuid_ec) {
  const entidadeEscolar = await fetchEntidadesEscolares(uuid_ec);

  if (entidadeEscolar) {
    await setEntidadesEscolaresStatus(uuid_ec);
    await deleteUserPdgRelations(entidadeEscolar.id);
    await deletePainelDadosRelations(entidadeEscolar.id);
  }
}

async function fetchEntidadesEscolares(uuid_ec) {
  const query = "SELECT * FROM entidades_escolares WHERE uuid_ec = $1";
  const { rows } = await connection.query(query, [uuid_ec]);

  return rows[0] || null;
}

async function setEntidadesEscolaresStatus(uuid_ec) {
  const query =
    "UPDATE entidades_escolares SET deleted = $1, ativo = $2 WHERE uuid_ec = $3";
  await connection.query(query, [DELETED_STATUS, INACTIVE_STATUS, uuid_ec]);
}

async function deleteUserPdgRelations(id_ee) {
  const query = "DELETE FROM usuarios_pdg WHERE id_ee = $1";
  await connection.query(query, [id_ee]);
}

async function deletePainelDadosRelations(id_ee) {
  const query = "DELETE FROM painel_dados WHERE id_ee = $1";
  await connection.query(query, [id_ee]);
}

async function updateEntidadesContratuaisStatus(uuid_ec) {
  const query =
    "UPDATE entidades_contratuais SET deleted = $1, ativo = $2 WHERE id = $3";
  await connection.query(query, [DELETED_STATUS, INACTIVE_STATUS, uuid_ec]);
}

async function fetchUpdatedContract(uuid_ec) {
  const query = "SELECT * FROM entidades_contratuais WHERE id = $1";
  const { rows } = await connection.query(query, [uuid_ec]);

  return rows || [];
}

module.exports = {
  DeletarContrato,
};