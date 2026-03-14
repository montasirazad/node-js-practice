const url = require("url");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routesHandler/notFoundHandler");
const handler = {};

handler.handleReqRes = (req, res) => {
  const method = req.method.toLowerCase();
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  console.log(trimmedPath);
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;
  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    queryStringObject,
    headersObject,
    method,
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
