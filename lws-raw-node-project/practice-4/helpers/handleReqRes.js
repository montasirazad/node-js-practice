const url = require("url");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");
const handler = {};

handler.handlerReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  const path = parsedUrl.pathname;
  const method = req.method.toLowerCase();
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const requestObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    method,
    trimmedPath,
    requestObject,
    headerObject,
  };
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;

  chosenHandler(requestProperties, (statusCode, payload) => {
    typeof statusCode === "number" ? statusCode : 500;
    typeof payload === "object" ? payload : {};
    const payloadString = JSON.stringify(payload);
    res.writeHead(statusCode);
    res.end(payloadString);
  });
};

module.exports = handler;
