const url = require("url");
const routes = require("../routes");
const { notfoundHandler } = require("../handlers/notFoundHandler");
const handler = {};
handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method.toLowerCase();
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const queryStringObject = req.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    method,
    path,
    trimmedPath,
    queryStringObject,
    headerObject,
  };

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notfoundHandler;

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payloadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payloadString);
  });
};

module.exports = handler;
