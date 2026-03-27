const utilities = {};
const crypto = require("crypto");
const environment = require("./helpers/environment");

utilities.parseJson = (str) => {
  let output;
  try {
    output = JSON.parse(str);
  } catch (error) {
    console.log(error);
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

module.exports = utilities;
