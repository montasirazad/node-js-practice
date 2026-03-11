const http = require("http");
const fs = require("fs");

const ourReadStream = fs.createReadStream(`${__dirname}/word.txt`);

ourReadStream.on("data", (chunk) => {
  console.log(chunk);
});

console.log('hello');