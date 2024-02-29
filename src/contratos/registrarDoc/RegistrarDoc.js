const connection = require("../../connection");

async function RegistrarDoc(req, res) {
  const fields = req.body;

  if (!validateRequiredFields(fields)) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const registredDoc = await insertDoc(fields);
    if (!registredDoc) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possível cadastrar o Documento."
      );
    }
    return res.status(201).json([registredDoc]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha RegistrarDoc");
  }
}

function validateRequiredFields(fields) {
  const requiredFields = ["uuid_ec", "nome_doc", "url_doc"];

  return requiredFields.every((field) => fields[field]);
}

async function insertDoc(fields) {
  const { uuid_ec, nome_doc, url_doc } = fields;

  const query =
    "INSERT INTO docs_contrato (uuid_ec, nome_doc, url_doc ) VALUES ($1, $2, $3) RETURNING *";

  const {
    rows: [registeredContract],
  } = await connection.query(query, [uuid_ec, nome_doc, url_doc]);

  return registeredContract;
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  RegistrarDoc,
};
