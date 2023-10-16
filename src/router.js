const { Router } = require("express");

const usuario = require("./controlersUsers/index");
const contratos = require("./contratos/index");
const entidadesEscolares = require("./entidadesEscolares/index");
const agentesExternos = require("./agenteEscolares/index");
// const validateToken = require("./middlewear/token");

const router = Router();
router.post(
  "/registrarUsuario",
  usuario.RegistrarUsuarioMiddleware.RegistrarUsuario
);
router.post("/login", usuario.LoginMiddleware.Login);

// router.use(validateToken);
router.post("/editarUsuario", usuario.EditarUsuarioMiddleware.EditarUsuario);
router.post(
  "/localizarUsuario",
  usuario.LocalizarUsuarioMiddleware.LocalizarUsuario
);
router.get(
  "/localizarUsuarios",
  usuario.LocalizarUsuariosMiddleware.LocalizarUsuarios
);

router.get(
  "/localizarUsuariosPDG",
  usuario.LocalizarUsuariosPDGMiddleware.LocalizarUsuariosPDG
);
router.post("/deletarUsuario", usuario.DeletarUsuarioMiddleware.DeletarUsuario);

//////////////////////// contratos ////////////////////////////////////////

router.post(
  "/registrarEntidadeContratual",
  contratos.RegistrarEntidadeContratualMiddleware.RegistrarEntidadeContratual
);

router.post(
  "/registrarDocContrato",
  contratos.RegistrarDocMiddleware.RegistrarDoc
);
router.post(
  "/listarDocsContrato",
  contratos.ListarDocsContratoMiddleware.ListarDocsContrato
);
router.post(
  "/editarEntidadeContratual",
  contratos.EditarEntidadeContratualMiddleware.EditarEntidadeContratual
);

router.get(
  "/localizarContratos",
  contratos.LocalizarContratosMiddleware.LocalizarContratos
);

router.post(
  "/localizarContrato",
  contratos.LocalizarContratoMiddleware.LocalizarContrato
);

router.post(
  "/deletarContrato",
  contratos.DeletarContratoMiddleware.DeletarContrato
);
router.post(
  "/deletarDocContrato",
  contratos.DeletarDocContratoMiddleware.DeletarDocContrato
);
router.post(
  "/sobrescreverContrato",
  contratos.SobreEscreverContratoMiddleware.SobreEscreverContrato
);
router.post(
  "/listarInfosContrato",
  contratos.ListarInfosContratoMiddleware.ListarInfosContrato
);

router.post(
  "/registrarInfosContrato",
  contratos.RegistrarInfosContratoMiddleware.RegistrarInfosContrato
);
router.post(
  "/deletarInfosContrato",
  contratos.DeletarInfosContratoMiddleware.DeletarInfosContrato
);
router.post(
  "/editarInfosContrato",
  contratos.EditarInfosContratoMiddleware.EditarInfosContrato
);
/////////////////////ENTIDADES ESCOLARES ///////////////////

router.post(
  "/registrarEntidadeEscolar",
  entidadesEscolares.RegistrarEntidadeEscolarMiddleware.RegistrarEntidadeEscolar
);

router.post(
  "/editarEntidadeEscolar",
  entidadesEscolares.EditarEntidadeEscolarMiddleware.EditarEntidadeEscolar
);

router.post(
  "/localizarEntidadesEscolares",
  entidadesEscolares.LocalizarEntidadesEscolaresMiddleware
    .LocalizarEntidadesEscolares
);

router.post(
  "/localizarEntidadeEscolar",
  entidadesEscolares.LocalizarEntidadeEscolarMiddleware.LocalizarEntidadeEscolar
);

router.get(
  "/todasEntidadesEscolares",
  entidadesEscolares.TodasEntidadesEscolaresMiddleware.TodasEntidadesEscolares
);

router.post(
  "/localizarEntidadesEscolaresUsuariosPDG",
  entidadesEscolares.LocalizarEntidadesEscolaresUsuariosPDGMiddleware
    .LocalizarEntidadesEscolaresUsuariosPDG
);

router.post(
  "/deletarEntidadeEscolar",
  entidadesEscolares.DeletarEntidadeEscolarMiddleware.DeletarEntidadeEscolar
);

router.post(
  "/localizarUrlPainel",
  entidadesEscolares.LocalizarUrlPainelMiddleware.LocalizarUrlPainel
);

router.post(
  "/listarDocsEntidade",
  entidadesEscolares.listarDocsEntidadeMiddleware.ListarDocsEntidade
);
router.post(
  "/registrarDocEntidade",
  entidadesEscolares.RegistrarDocEntidadeMiddleware.RegistrarDocEntidade
);

router.post(
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
router.post(
  "/ListarAgentesRelacionadoEscola",
  agentesExternos.ListarAgentesRelacionadoEscolaMiddleware
    .ListarAgentesRelacionadoEscola
);
router.post(
  "/editarAgente",
  agentesExternos.EditarAgenteMiddleware.EditarAgente
);
router.post(
  "/deletarAgente",
  agentesExternos.DeletarAgenteMiddleware.DeletarAgente
);
router.post(
  "/localizarAgenteId",
  agentesExternos.LocalizarAgenteIdMiddleware.LocalizarAgenteId
);
router.post(
  "/listarVinculoAgente",
  agentesExternos.ListarVinculoAgenteMiddleware.ListarVinculoAgente
);
router.post(
  "/deletarVinculoAgente",
  agentesExternos.DeletarVinculoAgenteMiddleware.DeletarVinculoAgente
);
router.post(
  "/editarVinculoAgente",
  agentesExternos.EditarVinculoAgenteMiddleware.EditarVinculoAgente
);
module.exports = router;
