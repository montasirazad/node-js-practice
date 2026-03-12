const http = require("http");
const environment = require("./helpers/environment");
const app = {};

app.handleReqRes = (req, res) => {
  res.end("hello node");
};

const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log("listening to port: ", environment.port);
});
