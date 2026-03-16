const url = require("url");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/notFoundHandler");
const { StringDecoder } = require("string_decoder");
const { parseJSON } = require("./utilities");

const handler = {};

handler.handleReqRes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  const requestProperties = {
    parsedUrl,
    path,
    method,
    queryStringObject,
    headerObject,
  };

  req.on("data", (buffer) => {
    console.log('line 27:',buffer);
    realData += decoder.write(buffer);
  });

  req.on("end", () => {
    realData += decoder.end();
    console.log(parseJSON(realData));
    requestProperties.body = parseJSON(realData);
    console.log(requestProperties.body);
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof statusCode === "number" ? statusCode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payLoadString = JSON.stringify(payload);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(statusCode);
    res.end(payLoadString);
  });
  });
  
};

module.exports = handler;
