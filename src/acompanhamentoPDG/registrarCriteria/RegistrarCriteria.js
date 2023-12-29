const connection = require("../../connection");

async function insertAcompanhamentoCriteria(data) {
  const query = `
      INSERT INTO acompanhamento_pdg_criteria (
        id_acmp, 
        e1,
        e2,
        e3,
        e4,
        e5,
        e6,
        m1,
        m2,
        m3,
        m4,
        m5,
        m6,
        l1,
        l2,
        l3,
        l4,
        l5,
        l6,
        finalized,
        finalizedtimestamp
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) 
      RETURNING *`;
  const values = [
    data.id_acmp,
    data.e1,
    data.e2,
    data.e3,
    data.e4,
    data.e5,
    data.e6,
    data.m1,
    data.m2,
    data.m3,
    data.m4,
    data.m5,
    data.m6,
    data.l1,
    data.l2,
    data.l3,
    data.l4,
    data.l5,
    data.l6,
    data.finalized,
    data.finalizedtimestamp,
  ];

  const {
    rows: [registeredAcompanhamentoCriteria],
  } = await connection.query(query, values);
  return registeredAcompanhamentoCriteria;
}

async function RegistrarAcompanhamentoCriteria(req, res) {
  try {
    const registeredAcompanhamentoCriteria = await insertAcompanhamentoCriteria(
      req.body
    );

    return res.status(201).json([registeredAcompanhamentoCriteria]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  RegistrarAcompanhamentoCriteria,
};
