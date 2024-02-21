const connection = require("../../connection");

const ATIVO_TRUE = true;
const ATIVO_FALSE = false;

async function SobreEscreverContrato(req, res) {
  const contratoData = req.body;

  try {
    const activoInfo = await findActiveInfo(contratoData.uuid_ec);

    if (activoInfo.length > 0) {
      await setInfoOldContract(contratoData.uuid_ec);
      await insertNewInfoContract(contratoData.uuid_ec);
    }
    return res.status(200).json(activoInfo);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function findActiveInfo(uuid_ec) {
  const query =
    "SELECT * FROM  infos_contrato WHERE uuid_ec = $1 AND ativo = $2";
  const { rows } = await connection.query(query, [uuid_ec, ATIVO_TRUE]);
  return rows;
}
async function setInfoOldContract(uuid_ec) {
  const query =
    "UPDATE infos_contrato SET ativo = $1 WHERE uuid_ec = $2 RETURNING *";
  const { rows } = await connection.query(query, [ATIVO_FALSE, uuid_ec]);
  return rows;
}

async function insertNewInfoContract(uuid_ec) {
  const query =
    "INSERT INTO infos_contrato (  uuid_ec, ativo ) VALUES ($1, $2) RETURNING *";

  const {
    rows: [registeredInfosContract],
  } = await connection.query(query, [uuid_ec, ATIVO_TRUE]);

  return registeredInfosContract;
}

module.exports = {
  SobreEscreverContrato,
};
