const path = require("path");
const fs = require("fs");
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    const stringData = JSON.stringify(data);
    if (!err && fileDescriptor) {
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err && fileDescriptor) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback("User created successfully.");
            } else {
              callback("Error closing file.");
            }
          });
        } else {
          callback("Error writing file.");
        }
      });
    } else {
      callback("Could not create new file/file may exist.");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}/${dir}/${file}.json`, "utf-8", (err, data) => {
    if (!err) {
      callback(false, data);
    } else {
      callback("Error reading file/file does not exist.");
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    const stringData = JSON.stringify(data);
    if (!err && fileDescriptor) {
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err && fileDescriptor) {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback("File updated successfully.");
                } else {
                  callback("Error updating file.");
                }
              });
            } else {
              callback("Error writing file.");
            }
          });
        } else {
          callback("Error updating file.");
        }
      });
    } else {
      callback("Error opening file/file does not exist.");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir}/${dir}/${file}.json`, (err) => {
    if (!err) {
      callback("File deleted successfully.");
    } else {
      callback("Error deleting file.");
    }
  });
};

module.exports = lib;
