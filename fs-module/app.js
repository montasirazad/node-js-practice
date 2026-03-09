const fs = require("fs");
const path = require("path");
// const filePath = path.join(__dirname,)

//fs.writeFileSync("test.txt", "this is test file 1", "utf-8");

 const filePath = path.join('folder','new','data.txt')
 console.log(filePath);
 const parsePath = path.parse(filePath)
 console.log(parsePath);
