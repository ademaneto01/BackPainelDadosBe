const RegistrarEntidadeContratualMiddleware = require("./registrarContrato/RegistrarEntidadeContratual");
const EditarEntidadeContratualMiddleware = require("./editarEntidadeContratual/EditarEntidadeContratual");
const LocalizarContratosMiddleware = require("./localizarContratos/LocalizarContratos");
const LocalizarContratoMiddleware = require("./localizarContrato/LocalizarContrato");
const DeletarContratoMiddleware = require("./deletarContrato/DeletarContrato");
const SobreEscreverContratoMiddleware = require("./sobreEscreverContrato/SobreEscreContrato");
module.exports = {
  RegistrarEntidadeContratualMiddleware,
  EditarEntidadeContratualMiddleware,
  LocalizarContratosMiddleware,
  LocalizarContratoMiddleware,
  DeletarContratoMiddleware,
  SobreEscreverContratoMiddleware,
};
