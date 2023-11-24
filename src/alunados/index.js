const RegistrarAlunadosMiddleware = require("./registrarAlunados/RegistrarAlunados");
const EditarAlunadosMiddleware = require("./editarAlunados/EditarAlunados");
const ListarTurmasMiddleware = require("./listarTurmas/ListarTurmas");
const ListarAlunadosMiddleware = require("./listarAlunados/ListarAlunados");
const ListarIndividualAlunadosMiddleware = require("./listarIndividualAlunados/ListarIndividualAlunados");
const ListarIndividualTurmasMiddleware = require("./listarIndividualTurmas/LIstarIndividualTurmas");
const DeletarAlunadosMiddleware = require("./deletarAlunados/DeletarAlunados");
module.exports = {
  RegistrarAlunadosMiddleware,
  EditarAlunadosMiddleware,
  ListarTurmasMiddleware,
  ListarAlunadosMiddleware,
  ListarIndividualAlunadosMiddleware,
  ListarIndividualTurmasMiddleware,
  DeletarAlunadosMiddleware,
};
