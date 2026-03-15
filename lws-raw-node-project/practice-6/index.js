const http = require("http");
const environment = require("./helpers/environments");
const lib = require("./lib/lib");
const app = {};

// lib.create('test','file_3',{name:'user 3',id:3},(err)=>{
//     console.log(err);
// })
// lib.read("test", "file_11", (err, data) => {
//   console.log(err);
//   console.log(data);
// });

// lib.update(
//   "test",
//   "file_3",
//   { name: "user 3", id: 3, type: "updating" },
//   (err) => {
//     console.log(err);
//   },
// );

// lib.delete('test','file_3',(err)=>{ 
//     console.log(err);
// })

app.handleReqRes = (req, res) => {
  res.end("hello from 6");
};

const server = http.createServer(app.handleReqRes);

server.listen(environment.port, () => {
  console.log(`Listening to port:${environment.port}`);
});
