const RegistrarAgenteMiddleware = require("./registrarAgente/registrarAgente");
const VincularAgenteMiddleware = require("./vincularAgente/vincularAgente");
const ListarTodosAgentesMiddleware = require("./listarTodosAgentes/listarTodosAgente");
const ListarAgentesRelacionadoEscolaMiddleware = require("./listarAgentesRelacionadoEscola/listarAgentesRelacionadoEscola");
const EditarAgenteMiddleware = require("./editarAgente/editarAgente");
const DeletarAgenteMiddleware = require("./deletarAgente/deletarAgente");
const LocalizarAgenteIdMiddleware = require("./localizarAgenteId/localizarAgenteId");
const ListarVinculoAgenteMiddleware = require("./listarVinculoAgente/listarVinculoAgente");
const DeletarVinculoAgenteMiddleware = require("./deletarVinculoAgente/deletarVinculoAgente");
const EditarVinculoAgenteMiddleware = require("./editarVinculoAgente/editarVinculoAgente");
const ListarAgentesRelacionadoEscolaIsProfMiddleware = require("./listarAgenteRelacionadoEscolaIsProf/ListarAgenteRelacionadoEscolaIsProf");
module.exports = {
  RegistrarAgenteMiddleware,
  VincularAgenteMiddleware,
  ListarTodosAgentesMiddleware,
  ListarAgentesRelacionadoEscolaMiddleware,
  EditarAgenteMiddleware,
  DeletarAgenteMiddleware,
  LocalizarAgenteIdMiddleware,
  ListarVinculoAgenteMiddleware,
  DeletarVinculoAgenteMiddleware,
  EditarVinculoAgenteMiddleware,
  ListarAgentesRelacionadoEscolaIsProfMiddleware,
};
