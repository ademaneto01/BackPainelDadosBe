const RegistrarAcompanhamentoMiddleware = require("./registrarAcompanhamento/RegistrarAcompanhamento");
const LocalizarAcompanhamentoUsuariosPDGMiddleware = require("./localizarAcompanhamento/LocalicarAcompanhamento");
const DeletarAcompanhamentoMiddleware = require("./deletarAcompanhamento/DeletarAcompanhamento");
const LocalizarAcompanhamentoByIdMiddleware = require("./localizarAcompanhamentoById/LocalizarAcompanhamentoById");
const RegistrarAcompanhamentoCriteriaMiddleware = require("./registrarCriteria/RegistrarCriteria");
const LocalizarAcompanhamentoCriteriaByIdMiddleware = require("./localizarCriteriaById/LocalizarCriteriaById");
const EditarCriteriaMiddleware = require("./editarCriteria/EditarCriteria");
const EditarAcompanhamentoMiddleware = require("./editarAcompanhamento/EditarAcompanhamento");
module.exports = {
  RegistrarAcompanhamentoMiddleware,
  LocalizarAcompanhamentoUsuariosPDGMiddleware,
  DeletarAcompanhamentoMiddleware,
  LocalizarAcompanhamentoByIdMiddleware,
  RegistrarAcompanhamentoCriteriaMiddleware,
  LocalizarAcompanhamentoCriteriaByIdMiddleware,
  EditarCriteriaMiddleware,
  EditarAcompanhamentoMiddleware,
};
