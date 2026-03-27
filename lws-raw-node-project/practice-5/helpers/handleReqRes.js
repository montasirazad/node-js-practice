const handler = {};
const url = require("url");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/notFoundHandler");
const { StringDecoder } = require("string_decoder");
const { parseJson } = require("../utilities");
handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method.toLowerCase();
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const queryStringObject = parsedUrl.query;
  const headersObject = req.headers;

  const requestProperties = {
    parsedUrl,
    method,
    trimmedPath,
    queryStringObject,
    path,
    headersObject,
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
    requestProperties.body = parseJson(realData);
    console.log(requestProperties.body);
    chosenHandler(requestProperties, (statusCode, payload) => {
      typeof statusCode === "string" ? statusCode : 500;
      typeof payload === "object" ? payload : {};
      const payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
