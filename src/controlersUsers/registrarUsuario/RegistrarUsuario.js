const connection = require("../../connection");
const bcrypt = require("bcrypt");

async function RegistrarUsuario(req, res) {
  const { nome, email, senha, perfil, id_ee } = req.body;

  if (!nome || !email || !senha || !perfil) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const userExists = await usuarioExiste(email);
    if (userExists) {
      return res.status(400).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const hash = await bcrypt.hash(senha, 10);
    const registredUser = await inserirUsuario(
      nome,
      email,
      hash,
      perfil,
      id_ee
    );

    if (!registredUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário." });
    }

    if (perfil === "Pedagógico" && id_ee) {
      await inserirUsuarioPedagogico(registredUser.id, id_ee);
    }

    delete registredUser.senha;
    return res.status(201).json([registredUser]);
  } catch (error) {
    return res.status(400).json({ mensagem: "Falha RegistrarUsuario" });
  }
}

async function usuarioExiste(email) {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const { rowCount } = await connection.query(query, [email]);
  return rowCount > 0;
}

async function inserirUsuario(nome, email, senha, perfil, id_ee) {
  const query =
    "INSERT INTO usuarios (nome, email, senha, perfil, id_ee) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const { rows } = await connection.query(query, [
    nome,
    email,
    senha,
    perfil,
    id_ee,
  ]);
  return rows[0];
}

async function inserirUsuarioPedagogico(idUsuario, id_ee) {
  const query = "INSERT INTO usuarios_pdg (id_usuario, id_ee) VALUES ($1, $2)";
  await connection.query(query, [idUsuario, id_ee]);
}

module.exports = {
  RegistrarUsuario,
};
