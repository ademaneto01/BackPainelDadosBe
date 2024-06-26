const connection = require("../../connection");

const ATIVO_TRUE = true;
const TEMP_TRUE = true;

async function SobreEscreverContrato(req, res) {
  const contratoData = req.body;

  try {
    await setInfoOldContract(contratoData.uuid_ec);
    const data = await insertNewInfoContract(contratoData.uuid_ec);

    return res.status(200).json([data]);
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha SobreEscreverContrato" });
  }
}

async function setInfoOldContract(uuid_ec) {
  const query =
    "UPDATE infos_contrato SET temp = $1 WHERE uuid_ec = $2 AND ativo = $3 RETURNING *";
  const { rows } = await connection.query(query, [
    TEMP_TRUE,
    uuid_ec,
    ATIVO_TRUE,
  ]);
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
