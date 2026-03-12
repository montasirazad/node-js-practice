const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");
const app = {};

// app.config = {
//   port: 5000,
// };

data.create("test", "file_1", { name: "BD", language: "bangla" }, (err) => {
  console.log(`Error was ${err}`);
});

app.handleReqRes = handleReqRes;
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {});
};

app.createServer();
