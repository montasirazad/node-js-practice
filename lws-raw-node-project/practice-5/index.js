const http = require("http");
const environment = require("./helpers/environment");
const app = {};
const lib = require("./lib/data");

app.handleReqRes = (req, res) => {
  res.end("hello file system");
};
const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log("Listening to port: ", environment.port);
});
