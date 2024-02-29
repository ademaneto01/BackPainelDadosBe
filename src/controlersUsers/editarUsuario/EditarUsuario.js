const connection = require("../../connection");
const bcrypt = require("bcrypt");

async function EditarUsuario(req, res) {
  const { id, nome, email, senha, perfil, id_ee } = req.body;

  if (!isRequestValid({ nome, email, senha, perfil, id_ee })) {
    return sendErrorResponse(
      res,
      400,
      "Todos os campos obrigatórios devem ser informados."
    );
  }

  try {
    if (await isEmailUsedByAnotherUser(email, id)) {
      return sendErrorResponse(
        res,
        400,
        "Já existe usuário cadastrado com o e-mail informado."
      );
    }

    if (await isPerfilChangedToPedagogico(id, perfil)) {
      await deleteUserFromPedagogico(id);
    }
    if (perfil === "Pedagógico") {
      await insertUserFromPedagogico(id, id_ee);
    }

    const updatedUser = await updateUser({
      id,
      nome,
      email,
      senha,
      perfil,
      id_ee,
    });

    if (!updatedUser) {
      return sendErrorResponse(
        res,
        400,
        "Não foi possivel atualizar o usuário."
      );
    }

    return res.status(200).json([updatedUser]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha EditarUsuario");
  }
}

function isRequestValid(data) {
  return Object.values(data).every((value) => value !== undefined);
}

async function isEmailUsedByAnotherUser(email, id) {
  const query = "SELECT * FROM usuarios WHERE email = $1 AND id != $2";
  const { rowCount } = await connection.query(query, [email, id]);
  return rowCount > 0;
}

async function isPerfilChangedToPedagogico(id, perfil) {
  const query = "SELECT perfil FROM usuarios WHERE id = $1";
  const { rows } = await connection.query(query, [id]);
  return (
    (rows[0]?.perfil === "Pedagógico" && perfil !== "Pedagógico") ||
    (rows[0]?.perfil === "Pedagógico" && perfil === "Pedagógico")
  );
}

async function deleteUserFromPedagogico(id) {
  const query = "DELETE FROM usuarios_pdg WHERE id_usuario = $1";
  return connection.query(query, [id]);
}

async function insertUserFromPedagogico(id, id_ee) {
  const query = "INSERT INTO usuarios_pdg (id_usuario, id_ee) VALUES ($1, $2)";
  return connection.query(query, [id, id_ee]);
}

async function updateUser(data) {
  const hash = await bcrypt.hash(data.senha, 10);
  const query =
    "UPDATE usuarios SET nome = $1, email = $2, senha = $3, perfil = $4, id_ee=$5 WHERE id = $6 RETURNING *";
  const { rows } = await connection.query(query, [
    data.nome,
    data.email,
    hash,
    data.perfil,
    data.id_ee,
    data.id,
  ]);
  return rows[0];
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = {
  EditarUsuario,
};
