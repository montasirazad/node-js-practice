const http = require("http");
const data = require("./lib/lib");
const environment = require("./helpers/environment");
const { handleReqRes } = require("./helpers/handleReqRes");
const app = {};

app.handleReqRes = handleReqRes;
// data.update(
//   "test",
//   "user_1",
//   {
//     name: "user_1",
//     age: 10,
//     role: "testing",
//     test: true,
//   },
//   (err) => {console.log(err);},
// );
const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log("listening to port: ", environment.port);
});
