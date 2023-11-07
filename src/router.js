const { Router } = require("express");

const usuario = require("./controlersUsers/index");
const contratos = require("./contratos/index");
const entidadesEscolares = require("./entidadesEscolares/index");
const agentesExternos = require("./agenteEscolares/index");
const validateToken = require("./middlewear/token");

const router = Router();

router.post("/login", usuario.LoginMiddleware.Login);

router.use(validateToken);
router.put("/editarUsuario", usuario.EditarUsuarioMiddleware.EditarUsuario);
router.get(
  "/localizarUsuario",
  usuario.LocalizarUsuarioMiddleware.LocalizarUsuario
);
router.get(
  "/localizarUsuarios",
  usuario.LocalizarUsuariosMiddleware.LocalizarUsuarios
);
router.post(
  "/registrarUsuario",
  usuario.RegistrarUsuarioMiddleware.RegistrarUsuario
);

router.get(
  "/localizarUsuariosPDG",
  usuario.LocalizarUsuariosPDGMiddleware.LocalizarUsuariosPDG
);
router.delete(
  "/deletarUsuario",
  usuario.DeletarUsuarioMiddleware.DeletarUsuario
);

//////////////////////// contratos ////////////////////////////////////////

router.post(
  "/registrarEntidadeContratual",
  contratos.RegistrarEntidadeContratualMiddleware.RegistrarEntidadeContratual
);

router.post(
  "/registrarDocContrato",
  contratos.RegistrarDocMiddleware.RegistrarDoc
);
router.get(
  "/listarDocsContrato",
  contratos.ListarDocsContratoMiddleware.ListarDocsContrato
);
router.put(
  "/editarEntidadeContratual",
  contratos.EditarEntidadeContratualMiddleware.EditarEntidadeContratual
);

router.get(
  "/localizarContratos",
  contratos.LocalizarContratosMiddleware.LocalizarContratos
);

router.get(
  "/localizarContrato",
  contratos.LocalizarContratoMiddleware.LocalizarContrato
);

router.delete(
  "/deletarContrato",
  contratos.DeletarContratoMiddleware.DeletarContrato
);
router.delete(
  "/deletarDocContrato",
  contratos.DeletarDocContratoMiddleware.DeletarDocContrato
);
router.put(
  "/sobrescreverContrato",
  contratos.SobreEscreverContratoMiddleware.SobreEscreverContrato
);
router.get(
  "/listarInfosContrato",
  contratos.ListarInfosContratoMiddleware.ListarInfosContrato
);

router.post(
  "/registrarInfosContrato",
  contratos.RegistrarInfosContratoMiddleware.RegistrarInfosContrato
);
router.delete(
  "/deletarInfosContrato",
  contratos.DeletarInfosContratoMiddleware.DeletarInfosContrato
);
router.put(
  "/editarInfosContrato",
  contratos.EditarInfosContratoMiddleware.EditarInfosContrato
);
/////////////////////ENTIDADES ESCOLARES ///////////////////

router.post(
  "/registrarEntidadeEscolar",
  entidadesEscolares.RegistrarEntidadeEscolarMiddleware.RegistrarEntidadeEscolar
);

router.put(
  "/editarEntidadeEscolar",
  entidadesEscolares.EditarEntidadeEscolarMiddleware.EditarEntidadeEscolar
);

router.get(
  "/localizarEntidadesEscolares",
  entidadesEscolares.LocalizarEntidadesEscolaresMiddleware
    .LocalizarEntidadesEscolares
);

router.get(
  "/localizarEntidadeEscolar",
  entidadesEscolares.LocalizarEntidadeEscolarMiddleware.LocalizarEntidadeEscolar
);

router.get(
  "/todasEntidadesEscolares",
  entidadesEscolares.TodasEntidadesEscolaresMiddleware.TodasEntidadesEscolares
);

router.get(
  "/localizarEntidadesEscolaresUsuariosPDG",
  entidadesEscolares.LocalizarEntidadesEscolaresUsuariosPDGMiddleware
    .LocalizarEntidadesEscolaresUsuariosPDG
);

router.delete(
  "/deletarEntidadeEscolar",
  entidadesEscolares.DeletarEntidadeEscolarMiddleware.DeletarEntidadeEscolar
);

router.get(
  "/localizarUrlPainel",
  entidadesEscolares.LocalizarUrlPainelMiddleware.LocalizarUrlPainel
);

router.get(
  "/listarDocsEntidade",
  entidadesEscolares.listarDocsEntidadeMiddleware.ListarDocsEntidade
);
router.post(
  "/registrarDocEntidade",
  entidadesEscolares.RegistrarDocEntidadeMiddleware.RegistrarDocEntidade
);

router.delete(
  "/deletarDocEntidade",
  entidadesEscolares.DeletarDocEntidadeMiddleware.DeletarDocEntidade
);

/////////////////////////////AGENTES EXTERNOS/////////////////
router.post(
  "/registrarAgente",
  agentesExternos.RegistrarAgenteMiddleware.RegistrarAgente
);
router.post(
  "/vincularAgente",
  agentesExternos.VincularAgenteMiddleware.VincularAgente
);
router.get(
  "/listarTodosAgentes",
  agentesExternos.ListarTodosAgentesMiddleware.ListarTodosAgentes
);
router.get(
  "/ListarAgentesRelacionadoEscola",
  agentesExternos.ListarAgentesRelacionadoEscolaMiddleware
    .ListarAgentesRelacionadoEscola
);
router.put(
  "/editarAgente",
  agentesExternos.EditarAgenteMiddleware.EditarAgente
);
router.delete(
  "/deletarAgente",
  agentesExternos.DeletarAgenteMiddleware.DeletarAgente
);
router.get(
  "/localizarAgenteId",
  agentesExternos.LocalizarAgenteIdMiddleware.LocalizarAgenteId
);
router.get(
  "/listarVinculoAgente",
  agentesExternos.ListarVinculoAgenteMiddleware.ListarVinculoAgente
);
router.delete(
  "/deletarVinculoAgente",
  agentesExternos.DeletarVinculoAgenteMiddleware.DeletarVinculoAgente
);
router.put(
  "/editarVinculoAgente",
  agentesExternos.EditarVinculoAgenteMiddleware.EditarVinculoAgente
);
module.exports = router;
