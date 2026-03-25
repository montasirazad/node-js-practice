const handler = {};
const url = require("url");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/notFoundHandler");
handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.path;
  const trimmedPath = pathName.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = req.query;

  const requestProperties = {
    parsedUrl,
    pathName,
    trimmedPath,
    method,
    queryStringObject,
  };

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payloadString = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(payloadString);
  });
};

module.exports = handler;
