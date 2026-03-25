const http = require("http");
const environment = require("./helpers/environments");
const { handleReqRes } = require("./handleReqRes/handleReqRes");
const lib = require("./lib/data");
const app = {};

lib.delete("test", "user_2", (err) => {
  console.log(err);
});

app.handleReqRes = handleReqRes;

app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port :`, environment.port);
  });
};

app.createServer();
