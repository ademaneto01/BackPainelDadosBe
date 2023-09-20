const { Router } = require("express");

// const auxiliaryFunction = require("./auxiliaryFunction/findDadosUser");
// const auxiliaryFunctionContract = require("./auxiliaryFunction/contratos");
// const auxiliaryFunctionEscola = require("./auxiliaryFunction/EntidadesEscolares");
// const auxiliaryFunctionProfessores = require("./auxiliaryFunction/professores");
const usuario = require("./controlersUsers/index");
const contratos = require("./contratos/index");
const entidadesEscolares = require("./entidadesEscolares/index");
// const validateToken = require("./middlewear/token");

const router = Router();
router.post(
  "/registrarUsuario",
  usuario.RegistrarUsuarioMiddleware.RegistrarUsuario
);
router.post("/login", usuario.LoginMiddleware.Login);

// // router.use(validateToken);
router.post("/editarUsuario", usuario.EditarUsuarioMiddleware.EditarUsuario);
router.post(
  "/localizarUsuario",
  usuario.LocalizarUsuarioMiddleware.LocalizarUsuario
);
router.get(
  "/localizarUsuarios",
  usuario.LocalizarUsuariosMiddleware.LocalizarUsuarios
);

router.get(
  "/localizarUsuariosPDG",
  usuario.LocalizarUsuariosPDGMiddleware.LocalizarUsuariosPDG
);
router.post("/deletarUsuario", usuario.DeletarUsuarioMiddleware.DeletarUsuario);

//////////////////////// contratos ////////////////////////////////////////

router.post(
  "/registrarEntidadeContratual",
  contratos.RegistrarEntidadeContratualMiddleware.RegistrarEntidadeContratual
);

router.post(
  "/editarEntidadeContratual",
  contratos.EditarEntidadeContratualMiddleware.EditarEntidadeContratual
);

router.get(
  "/localizarContratos",
  contratos.LocalizarContratosMiddleware.LocalizarContratos
);

router.post(
  "/localizarContrato",
  contratos.LocalizarContratoMiddleware.LocalizarContrato
);

router.post(
  "/deletarContrato",
  contratos.DeletarContratoMiddleware.DeletarContrato
);

router.post(
  "/sobrescreverContrato",
  contratos.SobreEscreverContratoMiddleware.SobreEscreverContrato
);

/////////////////////ENTIDADES ESCOLARES ///////////////////

router.post(
  "/registrarEntidadeEscolar",
  entidadesEscolares.RegistrarEntidadeEscolarMiddleware.RegistrarEntidadeEscolar
);

router.post(
  "/editarEntidadeEscolar",
  entidadesEscolares.EditarEntidadeEscolarMiddleware.EditarEntidadeEscolar
);

router.post(
  "/localizarEntidadesEscolares",
  entidadesEscolares.LocalizarEntidadesEscolaresMiddleware
    .LocalizarEntidadesEscolares
);

router.post(
  "/localizarEntidadeEscolar",
  entidadesEscolares.LocalizarEntidadeEscolarMiddleware.LocalizarEntidadeEscolar
);

router.get(
  "/todasEntidadesEscolares",
  entidadesEscolares.TodasEntidadesEscolaresMiddleware.TodasEntidadesEscolares
);

router.post(
  "/localizarEntidadesEscolaresUsuariosPDG",
  entidadesEscolares.LocalizarEntidadesEscolaresUsuariosPDGMiddleware
    .LocalizarEntidadesEscolaresUsuariosPDG
);

router.post(
  "/deletarEntidadeEscolar",
  entidadesEscolares.DeletarEntidadeEscolarMiddleware.DeletarEntidadeEscolar
);

// router.post(
//   "/registrarProfessor",
//   auxiliaryFunctionProfessores.registrarProfessor
// );

// router.post("/localizarDadosUsuario", auxiliaryFunction.localizarDadosUsuario);

// // router.post(
// //   "/deletarUsuarioEscola",
// //   users.dele
// // );
// router.post(
//   "/deletarEntidadeEscolar",
//   auxiliaryFunctionEscola.deletarEntidadeEscolar
// );
// router.post(
//   "/editarEntidadeContratual",
//   auxiliaryFunctionContract.editarEntidadeContratual
// );

// router.post("/localizarContrato", auxiliaryFunctionContract.localizarContrato);

module.exports = router;
