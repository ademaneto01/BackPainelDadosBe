const connection = require("../../connection");

async function EditarAcompanhamento(req, res) {
  const fields = req.body;

  try {
    const contractData = await updateAcompanhamento(fields);
    if (!contractData) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível atualizar o usuário."
      );
    }

    return res.status(200).json([contractData]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function updateAcompanhamento(fields) {
  const {
    id,
    nameSearch,
    educatorsname,
    userId,
    dataofobservation,
    grade,
    ofstudents,
    tema,
    lessonplanbe,
    cycle,
    digitalprojector,
    board,
    englishcorner,
    noiselevel,
    resourceaudioqlty,
    nglbematerials,
    lp1lessonplan,
    lp2proposedgoals,
    lp3resourcesused,
    lp4changes,
    finalcoments,
    finalized,
    finalizedtimestamp,
    nome_escola,
  } = fields;

  const updateDados =
    "UPDATE acompanhamento_pdg SET id_ee = $1, id_prof = $2, id_user = $3, dataofobservation = $4, grade = $5, ofstudents = $6, tema = $7, lessonplanbe = $8, cycle = $9, digitalprojector = $10, board = $11, englishcorner = $12, noiselevel = $13, resourceaudioqlty = $14, nglbematerials = $15, lp1lessonplan = $16, lp2proposedgoals = $17, lp3resourcesused = $18, lp4changes = $19, finalcoments = $20, finalized = $21, finalizedtimestamp = $22, nome_escola = $23 WHERE id = $24 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    nameSearch,
    educatorsname,
    userId,
    dataofobservation,
    grade,
    ofstudents,
    tema,
    lessonplanbe,
    cycle,
    digitalprojector,
    board,
    englishcorner,
    noiselevel,
    resourceaudioqlty,
    nglbematerials,
    lp1lessonplan,
    lp2proposedgoals,
    lp3resourcesused,
    lp4changes,
    finalcoments,
    finalized,
    finalizedtimestamp,
    nome_escola,
    id,
  ]);

  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarAcompanhamento,
};
