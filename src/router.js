const { Router } = require("express");

const usuario = require("./controlersUsers/index");
const contratos = require("./contratos/index");
const entidadesEscolares = require("./entidadesEscolares/index");
const agentesExternos = require("./agenteEscolares/index");
const alunados = require("./alunados/index");
const acompanhamentoPDG = require("./acompanhamentoPDG/index");
const validateToken = require("./middlewear/token");

const router = Router();

router.post("/login", usuario.LoginMiddleware.Login);

router.use(validateToken);
router.put("/editarUsuario", usuario.EditarUsuarioMiddleware.EditarUsuario);
router.put(
  "/editarUsuarioAtivo",
  usuario.EditarUsuarioAtivoMiddleware.EditarUsuarioAtivo
);
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
router.put(
  "/editarAtivoContrato",
  contratos.EditarAtivoContratoMiddleware.EditarAtivoContrato
);
router.put(
  "/editarAtivoEntidadeEscolar",
  entidadesEscolares.EditarAtivoEntidadeEscolarMiddleware
    .EditarAtivoEntidadeEscolar
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

router.get(
  "/listarInfosContratoTemp",
  contratos.ListarInfosContratoTempMiddleware.ListarInfosContratoTemp
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

router.put(
  "/editarInfosContratoTemp",
  contratos.EditarInfosContratoTempMiddleware.EditarInfosContratoTemp
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
router.get(
  "/ListarAgentesRelacionadoEscolaIsProf",
  agentesExternos.ListarAgentesRelacionadoEscolaIsProfMiddleware
    .ListarAgentesRelacionadoEscolaIsProf
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
router.post(
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

///////////////////////////////ALUNADOS/////////////////

router.post(
  "/registrarAlunados",
  alunados.RegistrarAlunadosMiddleware.RegistrarAlunados
);

router.put("/editarAlunados", alunados.EditarAlunadosMiddleware.EditarAlunados);

router.get(
  "/listarIndividualAlunados",
  alunados.ListarIndividualAlunadosMiddleware.ListarIndividualAlunados
);

router.get(
  "/listarIndividualTurmas",
  alunados.ListarIndividualTurmasMiddleware.ListarIndividualTurmas
);

router.delete(
  "/deletarAlunado",
  alunados.DeletarAlunadosMiddleware.DeletarAlunados
);

//////////////// ACOMPANHAMENTO PDG /////////////////////////

router.post(
  "/registrarAcompanhamento",
  acompanhamentoPDG.RegistrarAcompanhamentoMiddleware.RegistrarAcompanhamento
);

router.put(
  "/editarCriteria",
  acompanhamentoPDG.EditarCriteriaMiddleware.EditarCriteria
);

router.put(
  "/editarAcompanhamento",
  acompanhamentoPDG.EditarAcompanhamentoMiddleware.EditarAcompanhamento
);

router.post(
  "/registrarAcompanhamentoCriteria",
  acompanhamentoPDG.RegistrarAcompanhamentoCriteriaMiddleware
    .RegistrarAcompanhamentoCriteria
);

router.get(
  "/localizarAcompanhamento",
  acompanhamentoPDG.LocalizarAcompanhamentoUsuariosPDGMiddleware
    .LocalizarAcompanhamentoUsuariosPDG
);

router.delete(
  "/deletarAcompanhamento",
  acompanhamentoPDG.DeletarAcompanhamentoMiddleware.DeletarAcompanhamento
);

router.get(
  "/localizarAcompanhamentoById",
  acompanhamentoPDG.LocalizarAcompanhamentoByIdMiddleware
    .LocalizarAcompanhamentoById
);

router.get(
  "/LocalizarCriteriaById",
  acompanhamentoPDG.LocalizarAcompanhamentoCriteriaByIdMiddleware
    .LocalizarAcompanhamentoCriteriaById
);
module.exports = router;
