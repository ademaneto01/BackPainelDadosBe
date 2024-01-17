const connection = require("../../connection");

const deleted_status = false;

async function RegistrarAcompanhamento(req, res) {
  const fields = req.body;
  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }
  try {
    const registeredAcompanhamento = await insertAcompanhamento(fields);

    return res.status(201).json([registeredAcompanhamento]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function insertAcompanhamento(fields) {
  const query = `
      INSERT INTO acompanhamento_pdg (
        id_ee, 
        id_prof,
        nome_agente,
        id_user, 
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
        deleted
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25) 
      RETURNING *`;
  const values = [
    fields.nameSearch,
    fields.educatorsname,
    fields.nome_agente,
    fields.userId,
    fields.dataofobservation,
    fields.grade,
    fields.ofstudents,
    fields.tema,
    fields.lessonplanbe,
    fields.cycle,
    fields.digitalprojector,
    fields.board,
    fields.englishcorner,
    fields.noiselevel,
    fields.resourceaudioqlty,
    fields.nglbematerials,
    fields.lp1lessonplan,
    fields.lp2proposedgoals,
    fields.lp3resourcesused,
    fields.lp4changes,
    fields.finalcoments,
    fields.finalized,
    fields.finalizedtimestamp,
    fields.nome_escola,
    deleted_status,
  ];

  const {
    rows: [registeredAcompanhamento],
  } = await connection.query(query, values);
  return registeredAcompanhamento;
}

function validateRequiredFields(fields) {
  const requiredFields = [
    "nameSearch",
    "educatorsname",
    "nome_agente",
    "userId",
    "dataofobservation",
    "grade",
    "ofstudents",
    "tema",
    "lessonplanbe",
    "cycle",
    "digitalprojector",
    "board",
    "englishcorner",
    "noiselevel",
    "resourceaudioqlty",
    "nglbematerials",
    "lp1lessonplan",
    "lp2proposedgoals",
    "lp3resourcesused",
    "lp4changes",
    "finalcoments",
  ];

  return requiredFields.every((field) => fields[field]);
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarAcompanhamento,
};
