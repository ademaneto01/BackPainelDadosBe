const connection = require("../../connection");

async function RegistrarDocEntidade(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registredDocEntidade = await insertDocEntidade(fields);
    if (!registredDocEntidade) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o Documento."
      );
    }
    return res.status(201).json([registredDocEntidade]);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["uuid_ee", "nome_doc", "url_doc"];

  return requiredFields.every((field) => fields[field]);
}

async function insertDocEntidade(fields) {
  const { uuid_ee, nome_doc, url_doc } = fields;

  const query =
    "INSERT INTO docs_entidades_escolares (id_ee, nome_doc, url_doc ) VALUES ($1, $2, $3) RETURNING *";

  const {
    rows: [registeredContract],
  } = await connection.query(query, [uuid_ee, nome_doc, url_doc]);

  return registeredContract;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarDocEntidade,
};
