const RegistrarAcompanhamentoMiddleware = require("./registrarAcompanhamento/RegistrarAcompanhamento");
const LocalizarAcompanhamentoUsuariosPDGMiddleware = require("./localizarAcompanhamento/LocalicarAcompanhamento");
const DeletarAcompanhamentoMiddleware = require("./deletarAcompanhamento/DeletarAcompanhamento");
const LocalizarAcompanhamentoByIdMIddleware = require("./localizarAcompanhamentoById/LocalizarAcompanhamentoById");
module.exports = {
  RegistrarAcompanhamentoMiddleware,
  LocalizarAcompanhamentoUsuariosPDGMiddleware,
  DeletarAcompanhamentoMiddleware,
  LocalizarAcompanhamentoByIdMIddleware,
};
