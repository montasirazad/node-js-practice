const fs = require("fs");
const path = require("path");
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    const stringData = JSON.stringify(data);
    if (!err && fileDescriptor) {
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("server side error");
            }
          });
        } else {
          callback("Error writing file");
        }
      });
    } else {
      callback("Error opening file or file already exist");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, "utf-8", (err, data) => {
    if (!err) {
      callback(false, data);
    } else {
      callback("Error reading fille");
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    const stringData = JSON.stringify(data);
    if (!err && fileDescriptor) {
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("Error closing file");
                }
              });
            } else {
              callback("Error writing file.");
            }
          });
        } else {
          callback("Error updating file");
        }
      });
    } else {
      callback("Error opening file / file doesn't exist.");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

module.exports = lib;
