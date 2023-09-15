const connection = require("../connection");

async function registrarProfessor(req, res) {
  const {
    id_ee,
    nome,
    ativo,
    especialista,
    email_primario,
    email_secundario,
    bo_3ei,
    bo_4ei,
    bo_5ei,
    bo_1ai,
    bo_2ai,
    bo_3ai,
    bo_4ai,
    bo_5ai,
    bo_6af,
    bo_7af,
    bo_8af,
    bo_9af,
    bo_1em,
    bo_2em,
    bo_3em,
  } = req.body;

  if (
    !id_ee ||
    !nome ||
    !ativo ||
    !especialista ||
    !email_primario ||
    !email_secundario
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const query =
      "INSERT INTO pedagogico_professores (  id_ee, nome, ativo, especialista, email_primario, email_secundario ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const {
      rows: [registredProfessor],
    } = await connection.query(query, [
      id_ee,
      nome,
      ativo,
      especialista,
      email_primario,
      email_secundario,
    ]);

    const boFields = {
      bo_3ei: false,
      bo_4ei: false,
      bo_5ei: false,
      bo_1ai: false,
      bo_2ai: false,
      bo_3ai: false,
      bo_4ai: false,
      bo_5ai: false,
      bo_6af: false,
      bo_7af: false,
      bo_8af: false,
      bo_9af: false,
      bo_1em: false,
      bo_2em: false,
      bo_3em: false,
    };

    for (const key in boFields) {
      if (req.body.hasOwnProperty(key) && req.body[key] === true) {
        boFields[key] = true;
      }
    }

    const queryInsertUrlDados =
      "INSERT INTO vinculo_profs(id_prof, id_escola, bo_3ei, bo_4ei, bo_5ei, bo_1ai, bo_2ai, bo_3ai, bo_4ai, bo_5ai, bo_6af, bo_7af, bo_8af, bo_9af, bo_1em, bo_2em, bo_3em) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)";

    await connection.query(queryInsertUrlDados, [
      registredProfessor.id,
      id_ee,
      boFields.bo_3ei,
      boFields.bo_4ei,
      boFields.bo_5ei,
      boFields.bo_1ai,
      boFields.bo_2ai,
      boFields.bo_3ai,
      boFields.bo_4ai,
      boFields.bo_5ai,
      boFields.bo_6af,
      boFields.bo_7af,
      boFields.bo_8af,
      boFields.bo_9af,
      boFields.bo_1em,
      boFields.bo_2em,
      boFields.bo_3em,
    ]);

    if (!registredProfessor) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o Professor." });
    }

    return res.status(201).json(registredProfessor);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registrarProfessor,
};
