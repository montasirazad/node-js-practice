const url = require("url");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routesHandler/notFoundHandler");
const { StringDecoder } = require("string_decoder");
const { parseJson } = require("./utilities");

const handler = {};

handler.handleReqRes = (req, res) => {
  const method = req.method.toLowerCase();
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

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
    
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body =  JSON.parse(realData)

    chosenHandler(requestProperties, (statusCode, payload) => {
       console.log("requestProperties.body", requestProperties.body);
    console.log("realData", realData);
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
