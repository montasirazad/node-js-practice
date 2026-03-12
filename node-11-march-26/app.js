const http = require("http");
const fs = require("fs");
const url = require('url')
// const ourReadStream = fs.createReadStream(`${__dirname}/word.txt`);

// ourReadStream.on("data", (chunk) => {
//   console.log(chunk);
// });

// console.log('hello');


let adr = 'http://localhost:8080/default.htm?year=2017&month=february';
let q = url.parse(adr, true);
// console.log(url);
console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let qdata = q.query;
console.log(qdata.month);