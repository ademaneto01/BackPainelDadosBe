const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

async function registerUser(req, res) {
  const { nome, email, senha, perfil, url_dados, escola } = req.body;

  if (!nome || !email || !senha || !perfil || !escola) {
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
      "INSERT INTO usuarios (nome, email, senha, perfil, escola) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const {
      rows: [registredUser],
    } = await connection.query(query, [nome, email, hash, perfil, escola]);

    if (!registredUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o usuário." });
    } else {
      // const timestamp = Date.now();
      const queryFindEmailUser = "SELECT * FROM usuarios WHERE email = $1";
      const { rows } = await connection.query(queryFindEmailUser, [email]);

      const idDoUsuario = rows[0].id;

      const queryInsertDados =
        "INSERT INTO painel_dados ( url_dados, id_usuario) VALUES ($1, $2) RETURNING *";
      await connection.query(queryInsertDados, [url_dados, idDoUsuario]);
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
    } else {
      const timestamp = Date.now();

      const queryGetTimestamp =
        "SELECT * FROM painel_dados WHERE id_usuario = $1";
      const result = await connection.query(queryGetTimestamp, [userData.id]);

      const currentTimestamp = result.rows[0].time_stamp;

      const newTimestamp = currentTimestamp
        ? `${currentTimestamp}, ${timestamp}`
        : timestamp;

      const queryUpdateTimestamp =
        "UPDATE painel_dados SET time_stamp = $1 WHERE id_usuario = $2";
      await connection.query(queryUpdateTimestamp, [newTimestamp, userData.id]);
    }
    delete userData.senha;
    const token = jwt.sign(
      {
        id: userData.id,
      },
      jwtSecret
    );
    const data = [
      {
        id: userData.id,
        nome: userData.nome,
        email: userData.email,
        perfil: userData.perfil,
        escola: userData.escola,
        token,
      },
    ];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findUsers(req, res) {
  try {
    const query = "SELECT * FROM usuarios";
    const { rows, rowCount: user } = await connection.query(query);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function findUsersPDG(req, res) {
  try {
    const perfil = "Pedagógico";
    const query = "SELECT * FROM usuarios WHERE perfil = $1 ";
    const { rows, rowCount: user } = await connection.query(query, [perfil]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function deleteUser(req, res) {
  const { userId } = req.body;

  try {
    const selectQuery = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await connection.query(selectQuery, [userId]);

    const deleteQueryPainelDados =
      "DELETE FROM painel_dados WHERE id_usuario = $1";
    await connection.query(deleteQueryPainelDados, [userId]);

    const queryUsuario = "DELETE FROM usuarios WHERE id = $1";
    await connection.query(queryUsuario, [userId]);
    delete rows[0].senha;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function findOneUser(req, res) {
  const { userId } = req.body;

  try {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows, rowCount: user } = await connection.query(query, [userId]);
    const queryFindUrl =
      "SELECT url_dados FROM painel_dados WHERE id_usuario = $1";

    const { rows: url_dados } = await connection.query(queryFindUrl, [userId]);

    const userData = rows[0];
    delete userData.senha;
    rows[0].url_dados = url_dados[0].url_dados;

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function updateUser(req, res) {
  const { user } = req;
  const { id, nome, email, senha, perfil, escola, url_dados } = req.body;

  if (!nome || !email || !senha || !perfil || !escola || !url_dados) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const queryFindEmail =
      "SELECT * FROM usuarios WHERE email = $1  AND id != $2";
    const { rowCount: findedUser } = await connection.query(queryFindEmail, [
      email,
      id,
    ]);

    if (findedUser > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }
    const updateDados =
      "UPDATE painel_dados SET url_dados = $1 WHERE id_usuario = $2";
    const { row: dados } = await connection.query(updateDados, [url_dados, id]);
    const hash = await bcrypt.hash(senha, 10);
    const query =
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3, perfil = $4, escola=$5 WHERE id = $6";
    const { rows: update, rowCount: updatedUserNum } = await connection.query(
      query,
      [nome, email, hash, perfil, escola, id]
    );

    if (updatedUserNum === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar o usuário." });
    }
    user.url_dados = url_dados;
    return res.status(200).json([user]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registerUser,
  userLogin,
  updateUser,
  findUsers,
  findOneUser,
  deleteUser,
  findUsersPDG,
};
