const { Router } = require("express");
const users = require("./controlers/user");
const auxiliaryFunction = require("./auxiliaryFunction/findDadosUser");
const auxiliaryFunctionContract = require("./auxiliaryFunction/contratos");
const auxiliaryFunctionEscola = require("./auxiliaryFunction/EntidadesEscolares");
const auxiliaryFunctionProfessores = require("./auxiliaryFunction/professores");
const validateToken = require("./middlewear/token");

const router = Router();
router.post("/registrarUsuario", users.registrarUsuario);
router.post("/login", users.login);
router.post(
  "/registrarEntidadeContratual",
  auxiliaryFunctionContract.registrarEntidadeContratual
);
router.post(
  "/registrarEntidadeEscolar",
  auxiliaryFunctionEscola.registrarEntidadeEscolar
);

// router.use(validateToken);
router.post(
  "/registrarProfessor",
  auxiliaryFunctionProfessores.registrarProfessor
);
router.post("/localizarUsuario", users.localizarUsuario);
router.get("/localizarUsuarios", users.localizarUsuarios);
router.post("/localizarDadosUsuario", auxiliaryFunction.localizarDadosUsuario);
router.get("/localizarUsuariosPDG", users.localizarUsuariosPDG);
router.post("/editarUsuario", users.editarUsuario);
router.post("/deletarUsuario", users.deletarUsuario);

router.post("/deletarContrato", auxiliaryFunctionContract.deletarContrato);

router.post(
  "/localizarEntidadesEscolares",
  auxiliaryFunctionEscola.localizarEntidadesEscolares
);
router.get(
  "/todasEntidadesEscolares",
  auxiliaryFunctionEscola.todasEntidadesEscolares
);
router.post(
  "/localizarEntidadeEscolar",
  auxiliaryFunctionEscola.localizarEntidadeEscolar
);

router.post(
  "/localizarEntidadesEscolaresUsuariosPDG",
  auxiliaryFunctionEscola.localizarEntidadesEscolaresUsuariosPDG
);
router.post(
  "/editarEntidadeEscolar",
  auxiliaryFunctionEscola.editarEntidadeEscolar
);
// router.post(
//   "/deletarUsuarioEscola",
//   users.dele
// );
router.post(
  "/deletarEntidadeEscolar",
  auxiliaryFunctionEscola.deletarEntidadeEscolar
);
router.post(
  "/editarEntidadeContratual",
  auxiliaryFunctionContract.editarEntidadeContratual
);
router.post(
  "/sobrescreverContrato",
  auxiliaryFunctionContract.sobreescreverContrato
);

router.get("/localizarContratos", auxiliaryFunctionContract.localizarContratos);
router.post("/localizarContrato", auxiliaryFunctionContract.localizarContrato);

module.exports = router;
