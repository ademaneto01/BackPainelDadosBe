const connection = require("../connection");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || authorization === "Bearer") {
    return res.status(401).json({
      mensagem:
        "Para acessar este recurso um token de autenticação válido deve ser enviado.",
    });
  }

  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, jwtSecret);

    const query = "SELECT * FROM usuarios WHERE id = $1";
    const user = await connection.query(query, [id]);

    if (user.rowCount === 0) {
      return res.status(400).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      });
    }

    const userData = user.rows[0];

    delete userData.senha;

    req.user = userData;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = validateToken;
