const http = require("http");

const environment = require("./helpers/environment");
const { handleReqRes } = require("./helpers/handleReqRes");
const data = require("./lib/data");
const app = {};

app.handleReqRes = handleReqRes;

// data.create("test", "file_1", { name: "doe", age: "20" }, (err) => {
//   console.log(err);
// });

// data.read('test','file_1',(err,data)=>{
//   console.log(err,data);
// })

// data.update("test", "file_1", { name: "john_1", age: "40" }, (err) => {
//   console.log(err);
// });

// data.delete("test", "file_1", (err) => {
//   console.log(err);
// });

const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log(`Listening to port ${environment.port}`);
});
