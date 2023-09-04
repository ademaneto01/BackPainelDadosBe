const { Router } = require("express");
const users = require("./controlers/user");
const auxiliaryFunction = require("./auxiliaryFunction/findDadosUser");
const auxiliaryFunctionContract = require("./auxiliaryFunction/contratos");
const auxiliaryFunctionEscola = require("./auxiliaryFunction/EntidadesEscolares");
const validateToken = require("./middlewear/token");

const router = Router();
router.post("/cadastroUser", users.registerUser);
router.post("/login", users.userLogin);

router.use(validateToken);

router.post("/findOneUser", users.findOneUser);
router.get("/findUsers", users.findUsers);
router.post("/findDadosUser", auxiliaryFunction.findDadosUser);
router.get("/findUsersPDG", users.findUsersPDG);
router.post("/update", users.updateUser);
router.post("/deleteUser", users.deleteUser);
router.post("/registerContract", auxiliaryFunctionContract.registerContract);
router.post("/deleteContract", auxiliaryFunctionContract.deleteContrato);
router.post(
  "/registerEntidadeEscolar",
  auxiliaryFunctionEscola.registerEntidadeEscolar
);

router.post(
  "/findEntidadesEscolares",
  auxiliaryFunctionEscola.findEntidadesEscolares
);
router.post(
  "/findEntidadeEscolar",
  auxiliaryFunctionEscola.findEntidadeEscolar
);

router.post(
  "/findEntidadesEscolaresUserPDG",
  auxiliaryFunctionEscola.findEntidadesEscolaresUserPDG
);
router.post("/updateEscola", auxiliaryFunctionEscola.updateEscolas);
router.post("/deleteUserEscola", auxiliaryFunctionEscola.deleteUserEscola);
router.post(
  "/deleteEntidadeEscolar",
  auxiliaryFunctionEscola.deleteEntidadeEscolar
);
router.post("/updateContract", auxiliaryFunctionContract.updateContract);
router.post(
  "/sobreescreverContrato",
  auxiliaryFunctionContract.sobreescreverContrato
);

router.get("/findContracts", auxiliaryFunctionContract.findContracts);
router.post("/findOneContract", auxiliaryFunctionContract.findOneContract);

module.exports = router;
