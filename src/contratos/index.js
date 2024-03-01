const RegistrarEntidadeContratualMiddleware = require("./registrarContrato/RegistrarEntidadeContratual");
const EditarEntidadeContratualMiddleware = require("./editarEntidadeContratual/EditarEntidadeContratual");
const LocalizarContratosMiddleware = require("./localizarContratos/LocalizarContratos");
const LocalizarContratoMiddleware = require("./localizarContrato/LocalizarContrato");
const DeletarContratoMiddleware = require("./deletarContrato/DeletarContrato");
const SobreEscreverContratoMiddleware = require("./sobreEscreverContrato/SobreEscreverContrato");
const RegistrarDocMiddleware = require("./registrarDoc/RegistrarDoc");
const ListarDocsContratoMiddleware = require("./listarDocsContrato/ListarDocsContrato");
const DeletarDocContratoMiddleware = require("./deletarDocContrato/DeletarDocContrato");
const ListarInfosContratoMiddleware = require("./listarInfosContrato/ListarInfosContrato");
const RegistrarInfosContratoMiddleware = require("./registrarInfosContrato/RegistrarInfosContrato");
const DeletarInfosContratoMiddleware = require("./deletarInfosContrato/DeletarInfosContrato");
const EditarInfosContratoMiddleware = require("./editarInfosContrato/EditarInfosContrato");
const EditarAtivoContratoMiddleware = require("./editarAtivoContrato/EditarAtivoContrato");
const EditarInfosContratoTempMiddleware = require("./editarInfosContratoTemp/EditarInfosContratoTemp");
const ListarInfosContratoTempMiddleware = require("./listarInfosContratoTemp/ListarInfosContratoTemp");
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
  ListarInfosContratoMiddleware,
  RegistrarInfosContratoMiddleware,
  DeletarInfosContratoMiddleware,
  EditarInfosContratoMiddleware,
  EditarAtivoContratoMiddleware,
  EditarInfosContratoTempMiddleware,
  ListarInfosContratoTempMiddleware,
};
