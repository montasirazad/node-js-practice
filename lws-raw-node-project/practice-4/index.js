const http = require("http");
const environment = require("./helpers/environments");
const { handlerReqRes } = require("./helpers/handleReqRes");

const app = {};

app.handleReqRes = handlerReqRes;
const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log(`Listening to port: `, environment.port);
});
