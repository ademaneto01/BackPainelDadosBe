const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

async function registerUser(req, res) {
  const { nome, email, senha, perfil, url_dados } = req.body;

  if (!nome || !email || !senha || !perfil) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const queryFindEmail = "SELECT * FROM usuarios WHERE email = $1";
    const { rowCount: user } = await connection.query(queryFindEmail, [email]);

    if (user > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const hash = await bcrypt.hash(senha, 10);
    const query =
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES ($1, $2, $3, $4) RETURNING *";
    const {
      rows: [registredUser],
    } = await connection.query(query, [nome, email, hash, perfil]);

    if (!registredUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o usuário." });
    } else {
      const timestamp = Date.now();
      const queryFindEmailUser = "SELECT * FROM usuarios WHERE email = $1";
      const { rows } = await connection.query(queryFindEmailUser, [email]);

      const idDoUsuario = rows[0].id;

      const queryInsertDados =
        "INSERT INTO painel_dados ( url_dados, time_stamp, usuario_id) VALUES ($1, $2, $3) RETURNING *";
      await connection.query(queryInsertDados, [
        url_dados,
        timestamp,
        idDoUsuario,
      ]);
    }

    delete registredUser.senha;

    return res.status(201).json(registredUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function userLogin(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows, rowCount: user } = await connection.query(query, [email]);

    if (user === 0) {
      return res
        .status(404)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const userData = rows[0];

    const verifiedPassword = await bcrypt.compare(senha, userData.senha);

    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha inválido(s)" });
    }

    const token = jwt.sign(
      {
        id: userData.id,
      },
      jwtSecret
    );

    return res.status(200).json({ usuario: userData, token: token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function updateUser(req, res) {
  const { user } = req;
  const { nome, email, senha, profile } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const queryFindEmail =
      "SELECT * FROM usuarios WHERE email = $1 AND id != $2";
    const { rowCount: findedUser } = await connection.query(queryFindEmail, [
      email,
      user.id,
    ]);

    if (findedUser > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const hash = await bcrypt.hash(senha, 10);
    const query =
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3, perfil = $4  WHERE id = $5";
    const { rowCount: updatedUser } = await connection.query(query, [
      nome,
      email,
      hash,
      profile,
      user.id,
    ]);

    if (updatedUser === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar o usuário." });
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registerUser,
  userLogin,
  updateUser,
};
