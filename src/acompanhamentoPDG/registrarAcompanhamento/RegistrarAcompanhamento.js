const connection = require("../../connection");

async function insertAcompanhamento(data) {
  const query = `
      INSERT INTO acompanhamento_pdg (
        id_ee, 
        id_prof,
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
        finalizedtimestamp
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) 
      RETURNING *`;
  const values = [
    data.nameSearch,
    data.educatorsname,
    data.userId,
    data.dataofobservation,
    data.grade,
    data.ofstudents,
    data.tema,
    data.lessonplanbe,
    data.cycle,
    data.digitalprojector,
    data.board,
    data.englishcorner,
    data.noiselevel,
    data.resourceaudioqlty,
    data.nglbematerials,
    data.lp1lessonplan,
    data.lp2proposedgoals,
    data.lp3resourcesused,
    data.lp4changes,
    data.finalcoments,
    data.finalized,
    data.finalizedtimestamp,
  ];

  const {
    rows: [registeredAcompanhamento],
  } = await connection.query(query, values);
  return registeredAcompanhamento;
}

async function RegistrarAcompanhamento(req, res) {
  try {
    const registeredAcompanhamento = await insertAcompanhamento(req.body);

    return res.status(201).json([registeredAcompanhamento]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  RegistrarAcompanhamento,
};
