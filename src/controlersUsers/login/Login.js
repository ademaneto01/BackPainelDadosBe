const connection = require("../../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../jwtSecret");

async function Login(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return sendErrorResponse(res, 404, "Usuário e/ou senha inválido(s)");
    }

    if (!(await isPasswordValid(senha, user.senha))) {
      return sendErrorResponse(res, 400, "Usuário e/ou senha inválido(s)");
    }

    const tokenData = generateUserToken(user);
    return res.status(200).json(tokenData);
  } catch (error) {
    return sendErrorResponse(res, 400, error.message);
  }
}

async function getUserByEmail(email) {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const { rows } = await connection.query(query, [email]);

  return rows[0];
}

async function isPasswordValid(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

function generateUserToken(user) {
  delete user.senha;

  const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "12h" });
  return [
    {
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
      id_ee: user.id_ee,
      token,
    },
  ];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  Login,
};
