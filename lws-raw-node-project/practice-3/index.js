const http = require("http");
const data = require("./lib/lib");
const environment = require("./helpers/environment");
const { handleReqRes } = require("./helpers/handleReqRes");
const app = {};

app.handleReqRes = handleReqRes;

// data.create('test','user_3',{name:'user_3',age:12},(err)=>{
//   console.log(err);
// })

// data.read("test", "user_1", (err, data) => {
//   console.log(err, data);
// });

data.update(
  "test",
  "user_1",
  { name: "user_1", age: 10, role: "testing" },
  (err) => {
    console.log(err);
  },
);
const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log("listening to port: ", environment.port);
});
