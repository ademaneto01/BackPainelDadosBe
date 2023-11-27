const RegistrarAlunadosMiddleware = require("./registrarAlunados/RegistrarAlunados");
const EditarAlunadosMiddleware = require("./editarAlunados/EditarAlunados");
const ListarIndividualAlunadosMiddleware = require("./listarIndividualAlunados/ListarIndividualAlunados");
const ListarIndividualTurmasMiddleware = require("./listarIndividualTurmas/LIstarIndividualTurmas");
const DeletarAlunadosMiddleware = require("./deletarAlunados/DeletarAlunados");
module.exports = {
  RegistrarAlunadosMiddleware,
  EditarAlunadosMiddleware,
  ListarIndividualAlunadosMiddleware,
  ListarIndividualTurmasMiddleware,
  DeletarAlunadosMiddleware,
};
