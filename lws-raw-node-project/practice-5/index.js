const http = require("http");
const environment = require("./helpers/environment");
const app = {};
const lib = require("./lib/data");
const { handleReqRes } = require("./helpers/handleReqRes");

app.handleReqRes = handleReqRes;

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log("Listening to port: ", environment.port);
  });
};

app.createServer();
