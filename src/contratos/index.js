const RegistrarEntidadeContratualMiddleware = require("./registrarContrato/RegistrarEntidadeContratual");
const EditarEntidadeContratualMiddleware = require("./editarEntidadeContratual/EditarEntidadeContratual");
const LocalizarContratosMiddleware = require("./localizarContratos/LocalizarContratos");
const LocalizarContratoMiddleware = require("./localizarContrato/LocalizarContrato");
const DeletarContratoMiddleware = require("./deletarContrato/DeletarContrato");
const SobreEscreverContratoMiddleware = require("./sobreEscreverContrato/SobreEscreContrato");
const RegistrarDocMiddleware = require("./registrarDoc/RegistrarDoc");
const ListarDocsContratoMiddleware = require("./listarDocsContrato/ListarDocsContrato");
const DeletarDocContratoMiddleware = require("./deletarDocContrato/DeletarDocContrato");
module.exports = {
  RegistrarEntidadeContratualMiddleware,
  EditarEntidadeContratualMiddleware,
  LocalizarContratosMiddleware,
  LocalizarContratoMiddleware,
  DeletarContratoMiddleware,
  SobreEscreverContratoMiddleware,
  RegistrarDocMiddleware,
  ListarDocsContratoMiddleware,
  DeletarDocContratoMiddleware,
};
