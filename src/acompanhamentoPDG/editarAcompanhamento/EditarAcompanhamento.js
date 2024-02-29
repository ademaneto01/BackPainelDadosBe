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
    nome_agente,
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
    "UPDATE acompanhamento_pdg SET id_ee = $1, id_prof = $2, nome_agente = $3, id_user = $4, dataofobservation = $5, grade = $6, ofstudents = $7, tema = $8, lessonplanbe = $9, cycle = $10, digitalprojector = $11, board = $12, englishcorner = $13, noiselevel = $14, resourceaudioqlty = $15, nglbematerials = $16, lp1lessonplan = $17, lp2proposedgoals = $18, lp3resourcesused = $19, lp4changes = $20, finalcoments = $21, finalized = $22, finalizedtimestamp = $23, nome_escola = $24 WHERE id = $25 RETURNING *";

  const { rows } = await connection.query(updateDados, [
    nameSearch,
    educatorsname,
    nome_agente,
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
  return res
    .status(statusCode)
    .json({ mensagem: "Falha EditarAcompanhamento" });
}

module.exports = {
  EditarAcompanhamento,
};
