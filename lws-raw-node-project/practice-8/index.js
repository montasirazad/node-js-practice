const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const lib = require("./lib/data");

const app = {};
lib.delete("test", "user_4", (err) => {
  console.log(err);
});
app.createServer = () => {
  const server = http.createServer(handleReqRes);
  server.listen(environment.port, () => {
    console.log(`Listening to port: ${environment.port}`);
  });
};

app.createServer();
