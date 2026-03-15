const fs = require("fs");
const path = require("path");
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    const stringData = JSON.stringify(data);
    if (!err && fileDescriptor) {
      console.log(`File descriptor: ${fileDescriptor}`);
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(`Error:${false}-${file} created successfully`);
            } else {
              callback("error closing file");
            }
          });
        } else {
          callback("Error writing file");
        }
      });
    } else {
      callback("Error creating file or file already exist");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir + dir}/${file}.json`, "utf-8", (err, data) => {
    if (!err) {
      console.log(data);
    } else {
      callback("Error reading file / file not exists");
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback("file updated successfully.");
                } else {
                  callback("Server side error:error closing file");
                }
              });
            } else {
              callback("error writing file.");
            }
          });
        } else {
          callback("Error updating file");
        }
      });
    } else {
      callback("Error opening file / file not found");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(`${file} deleted successfully./n Error:false`);
    } else {
      callback("Error deleting file/file not found");
    }
  });
};
module.exports = lib;
