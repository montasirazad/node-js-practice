const http = require("http");
const data = require("./lib/lib");
const environment = require("./helpers/environment");
const { handleReqRes } = require("./helpers/handleReqRes");
const { parseJson } = require("./helpers/utilities");
const app = {};

app.handleReqRes = handleReqRes;
// data.read(
//   "test",
//   "user_1",

//   (err, data) => {
//     console.log(err, parseJson(data));
//   },
// );
const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log("listening to port: ", environment.port);
});
