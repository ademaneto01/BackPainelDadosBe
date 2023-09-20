const LoginMiddleware = require("./login/Login");
const RegistrarUsuarioMiddleware = require("./registrarUsuario/RegistrarUsuario");
const EditarUsuarioMiddleware = require("./editarUsuario/EditarUsuario");
const LocalizarUsuarioMiddleware = require("./localizarUsuario/LocalizarUsuario");
const LocalizarUsuariosMiddleware = require("./localizarUsuarios/LocalizarUsuarios");
const LocalizarUsuariosPDGMiddleware = require("./localizarUsuariosPDG/LocalizarUsuariosPDG");
const DeletarUsuarioMiddleware = require("./deletarUsuario/DeletarUsuario");
module.exports = {
  LoginMiddleware,
  RegistrarUsuarioMiddleware,
  EditarUsuarioMiddleware,
  LocalizarUsuarioMiddleware,
  LocalizarUsuariosMiddleware,
  LocalizarUsuariosPDGMiddleware,
  DeletarUsuarioMiddleware,
};
