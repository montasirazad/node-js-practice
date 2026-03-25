const path = require("path");
const fs = require("fs");
const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, "wx", (err, fd) => {
    if (!err && fd) {
      const stringData = JSON.stringify(data);
      fs.writeFile(fd, stringData, (err) => {
        if (!err & fd) {
          fs.close(fd, (err) => {
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
      callback("Could not create user / user already exist.");
    }
  });
};

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}/${dir}/${file}.json`, "utf-8", (err, data) => {
    if (!err) {
      callback(false, data);
    } else {
      callback("Error reading file / file not exist");
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, "r+", (err, fd) => {
    const stringData = JSON.stringify(data);
    if (!err && fd) {
      fs.ftruncate(fd, (err) => {
        if (!err && fd) {
          fs.writeFile(fd, stringData, (err) => {
            if (!err && fd) {
              fs.close(fd, (err) => {
                if (!err) {
                  callback("Data updated successfully.");
                } else {
                  callback("Error closing file.");
                }
              });
            } else {
              callback("error updating data");
            }
          });
        } else {
          callback("Error truncating file.");
        }
      });
    } else {
      callback("Error updating file / file not exist.",err);
    }
  });
};

lib.delete=(dir,file,callback)=>{
fs.unlink(`${lib.baseDir}/${dir}/${file}.json`,(err)=>{
    if(!err){
        callback('File deleted successfully.')
    }else{
        callback('Error deleting file / file not exist.')
    }
})
}
module.exports = lib;
