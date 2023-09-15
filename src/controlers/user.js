const connection = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwtSecret");

async function registrarUsuario(req, res) {
  const { nome, email, senha, perfil, id_ee } = req.body;

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
      "INSERT INTO usuarios (nome, email, senha, perfil, id_ee) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const {
      rows: [registredUser],
    } = await connection.query(query, [nome, email, hash, perfil, id_ee]);

    if (!registredUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel cadastrar o usuário." });
    }

    delete registredUser.senha;

    return res.status(201).json(registredUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function login(req, res) {
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
    // não faz mais sentido o time_stamp para painel de dados para controlar acesso
    // else {
    //   const timestamp = Date.now();

    //   const queryGetTimestamp =
    //     "SELECT * FROM painel_dados WHERE id_usuario = $1";
    //   const result = await connection.query(queryGetTimestamp, [userData.id]);

    //   const currentTimestamp = result.rows[0].time_stamp;

    //   const newTimestamp = currentTimestamp
    //     ? `${currentTimestamp}, ${timestamp}`
    //     : timestamp;

    //   const queryUpdateTimestamp =
    //     "UPDATE painel_dados SET time_stamp = $1 WHERE id_usuario = $2";
    //   await connection.query(queryUpdateTimestamp, [newTimestamp, userData.id]);
    // }
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
        id_ee: userData.id_ee,
        token,
      },
    ];
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarUsuarios(req, res) {
  try {
    const query = "SELECT * FROM usuarios";
    const { rows, rowCount: user } = await connection.query(query);
    const userData = rows;
    const escolaUsuario = [];

    for (let user of userData) {
      const queryEntidadeEscolar =
        "SELECT * FROM entidades_escolares WHERE id = $1";
      const { rows: entidadeEscolar } = await connection.query(
        queryEntidadeEscolar,
        [user.id_ee]
      );

      user.escola = entidadeEscolar[0].nome_operacional;
      escolaUsuario.push(user);
    }

    return res.status(200).json(escolaUsuario);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function localizarUsuariosPDG(req, res) {
  try {
    const perfil = "Pedagógico";
    const query = "SELECT * FROM usuarios WHERE perfil = $1 ";
    const { rows } = await connection.query(query, [perfil]);

    const userData = rows;

    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
async function deletarUsuario(req, res) {
  const { userId } = req.body;

  try {
    const selectQuery = "SELECT * FROM usuarios WHERE id = $1";
    const { rows } = await connection.query(selectQuery, [userId]);
    if (rows[0].perfil === "Pedagógico") {
      const queryUsuarioPdg = "DELETE FROM usuarios_pdg WHERE id_usuario = $1";
      await connection.query(queryUsuarioPdg, [userId]);
    }
    const queryUsuario = "DELETE FROM usuarios WHERE id = $1";
    await connection.query(queryUsuario, [userId]);
    delete rows[0].senha;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function localizarUsuario(req, res) {
  const { userId } = req.body;

  try {
    const query = "SELECT * FROM usuarios WHERE id = $1";
    const { rows, rowCount: user } = await connection.query(query, [userId]);

    const userData = rows[0];
    delete userData.senha;

    const queryEntidadeEscolar =
      "SELECT * FROM entidades_escolares WHERE id = $1";
    const { rows: entidadeEscolar } = await connection.query(
      queryEntidadeEscolar,
      [userData.id_ee]
    );

    userData.escola = entidadeEscolar[0].nome_operacional;

    return res.status(200).json([userData]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function editarUsuario(req, res) {
  const { id, nome, email, senha, perfil, id_ee } = req.body;

  if (!nome || !email || !senha || !perfil || !id_ee) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const queryFindEmail =
      "SELECT * FROM usuarios WHERE email = $1  AND id != $2";
    const { rows: user, rowCount: findedUser } = await connection.query(
      queryFindEmail,
      [email, id]
    );
    if (user[0].perfil === "Pegagógico" && perfil !== "Pedagógico") {
      const queryUsuarioPdg = "DELETE FROM usuarios_pdg WHERE id_usuario = $1";
      await connection.query(queryUsuarioPdg, [id]);
    }
    if (findedUser > 0) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const hash = await bcrypt.hash(senha, 10);
    const query =
      "UPDATE usuarios SET nome = $1, email = $2, senha = $3, perfil = $4, id_ee=$5 WHERE id = $6 RETURNING *";
    const { rows: update, rowCount: updatedUserNum } = await connection.query(
      query,
      [nome, email, hash, perfil, id_ee, id]
    );

    if (updatedUserNum === 0) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possivel atualizar o usuário." });
    }
    userDataUpdated = update;
    return res.status(200).json(userDataUpdated);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  registrarUsuario,
  login,
  editarUsuario,
  localizarUsuarios,
  localizarUsuario,
  deletarUsuario,
  localizarUsuariosPDG,
};
