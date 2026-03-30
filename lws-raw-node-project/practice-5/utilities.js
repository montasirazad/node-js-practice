const utilities = {};
const crypto = require("crypto");
const environment = require("./helpers/environment");

utilities.parseJson = (str) => {
  let output;
  try {
    output = JSON.parse(str);
  } catch (error) {
    output = {};
    //console.log(error);
  }
  return output;
};

utilities.hash = (pass) => {
  if (typeof pass === "string" && pass.length > 0) {
    let hashedPassword = crypto
      .createHash("sha256", environment.secret)
      .update(pass)
      .digest("hex");
    return hashedPassword;
  }
  return false;
};

utilities.randomString = (strLength) => {
  let length =
    typeof strLength === "number" && strLength > 0 ? strLength : false;
  let possibleCharacter = "abcdefghijklmnopqrstuvwxyz0123456789";

  if (length) {
    let output = "";
    for (let i = 1; i <= length; i++) {
      let randomString = possibleCharacter.charAt(
        Math.floor(Math.random() * possibleCharacter.length),
      );
      output += randomString;
    }
    return output;
  } else {
    return false;
  }
};

module.exports = utilities;
