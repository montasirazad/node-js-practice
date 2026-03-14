const fs = require("fs");
const path = require("path");
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("error closing file");
            }
          });
        } else {
          callback("Error writing file");
        }
      });
    } else {
      callback("Error opening file or file may exists");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

module.exports = lib;
