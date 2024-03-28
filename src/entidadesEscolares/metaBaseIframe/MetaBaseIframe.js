var jwt = require("jsonwebtoken");

async function MetaBaseIframe(req, res) {
  const { id } = req.query;

  try {
    var METABASE_SITE_URL = "https://dados.be.education";
    var METABASE_SECRET_KEY =
      "a00dcd93992562f5bfdedb18a918c7dd724ee5d450ecb0d73f46b9deeeddd906";
    const nome = id.replace(/^"|"$/g, "");
    var payload = {
      resource: { dashboard: 10 },
      params: {
        escolas: [`${nome}`],
      },
      exp: Math.round(Date.now() / 1000) + 40 * 60, //
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    var iframeUrl =
      METABASE_SITE_URL +
      "/embed/dashboard/" +
      token +
      "#bordered=true&titled=true";

    return res.status(200).json([{ iframeUrl: iframeUrl }]);
  } catch (error) {
    return sendErrorResponse(res, 400, "Falha em localizar URL");
  }
}

function sendErrorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ mensagem: message });
}

module.exports = { MetaBaseIframe };
