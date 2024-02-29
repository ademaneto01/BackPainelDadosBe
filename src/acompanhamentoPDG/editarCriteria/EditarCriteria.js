const connection = require("../../connection");

async function EditarCriteria(req, res) {
  const fields = req.body;

  try {
    const criteriaData = await updateAcompanhamentoCriteria(fields);
    if (!criteriaData) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível atualizar o acompanhamento criteria."
      );
    }

    return res.status(200).json([criteriaData]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha EditarCriteria");
  }
}

async function updateAcompanhamentoCriteria(fields) {
  const {
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
    finalizedtimestamp,
  } = fields;

  const validatedFields = [
    validateOrTransform(e1, true),
    validateOrTransform(e2, true),
    validateOrTransform(e3, true),
    validateOrTransform(e4, true),
    validateOrTransform(e5, true),
    validateOrTransform(e6, true),
    validateOrTransform(m1, true),
    validateOrTransform(m2, true),
    validateOrTransform(m3, true),
    validateOrTransform(m4, true),
    validateOrTransform(m5, true),
    validateOrTransform(m6, true),
    validateOrTransform(l1, true),
    validateOrTransform(l2, true),
    validateOrTransform(l3, true),
    validateOrTransform(l4, true),
    validateOrTransform(l5, true),
    validateOrTransform(l6, true),
    finalized,
    validateOrTransform(finalizedtimestamp),
  ];

  const updateDados =
    "UPDATE acompanhamento_pdg_criteria SET e1 = $1, e2 = $2, e3 = $3, e4 = $4, e5 = $5, e6 = $6, m1 = $7, m2 = $8, m3 = $9, m4 = $10, m5 = $11, m6 = $12, l1 = $13, l2 = $14, l3 = $15, l4 = $16, l5 = $17, l6 = $18, finalized = $19, finalizedtimestamp = $20 WHERE id_acmp = $21 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    ...validatedFields,
    id_acmp,
  ]);

  return rows[0];
}
function validateOrTransform(field, isNumeric = false) {
  if (field === "") {
    return null;
  }
  return isNumeric ? parseFloat(field) : field;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarCriteria,
};
