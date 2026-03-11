const http = require("http");

const environment = require("./helpers/environment");
const { handleReqRes } = require("./helpers/handleReqRes");
const app = {};

app.handleReqRes = handleReqRes

const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log(`Listening to port ${environment.port}`);
});
