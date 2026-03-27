const crypto = require("crypto");
const environments = require("../helpers/environments");
const utilities = {};
utilities.parsedJson = (jsonString) => {
  let output;
  try {
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
    console.log(error);
  }
  return output;
};

utilities.hash = (password) => {
  if (typeof password === "string" && password.length > 0) {
    let hash = crypto
      .createHash("sha256", environments.secret)
      .update(password)
      .digest("hex");
    return hash;
  }
  return false;
};

module.exports = utilities;
