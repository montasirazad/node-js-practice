const utilities = {};
const crypto = require("crypto");
const environment = require("../helpers/environment");

utilities.parseJson = (jsonString) => {
  let output;
  try {
    //console.log('line 8',jsonString);
    output = JSON.parse(jsonString);
  } catch (error) {
    output = {};
    console.log("json error:", error);
  }
  return output;
};

utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    let hash = crypto
      .createHash("sha256", environment.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

module.exports = utilities;
