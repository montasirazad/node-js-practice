const path = require("path");
const fs = require("fs");
const lib = {};

lib.baserDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(
    lib.baserDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        console.log(stringData);
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
            callback("Error writing new file");
          }
        });
      } else {
        callback("Could not create new file,file may exists");
      }
    },
  );
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baserDir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baserDir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
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
              callback("Error writing file");
            }
          });
        } else {
          callback(err, "Error truncating file");
        }
      });
    } else {
      callback("Error updating file may not exist");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baserDir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("error deleting file");
    }
  });
};

module.exports = lib;
