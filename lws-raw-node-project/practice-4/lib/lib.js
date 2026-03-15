const path = require("path");
const fs = require("fs");
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
              callback(`${false}--Data saved successfully`);
            } else {
              callback("Error closing file");
            }
          });
        } else {
          callback("Error writing file");
        }
      });
    } else {
      callback("Error opening file or file may already exists");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
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
              callback("error writing file");
            }
          });
        } else {
          callback("Error truncating file");
        }
      });
    } else {
      callback("Error opening file");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback("File deleted successfully");
    } else {
      callback("Error deleting file");
    }
  });
};

module.exports = lib;
