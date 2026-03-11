const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const app = {};

// app.config = {
//   port: 5000,
// };
app.handleReqRes = handleReqRes;
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
  });
};

app.createServer();
