const url = require("url");
const routes = require("../routes");

const { StringDecoder } = require("string_decoder");
const { parsedJson } = require("./utilities");
const { notFoundHandler } = require("../handlers/notFoundHandler");
const handler = {};

handler.handlerReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toLowerCase();
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    method,
    trimmedPath,
    queryStringObject,
    headerObject,
  };
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parsedJson(realData);
    chosenHandler(requestProperties, (statusCode, payload) => {
      typeof statusCode === "number" ? statusCode : 500;
      typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
