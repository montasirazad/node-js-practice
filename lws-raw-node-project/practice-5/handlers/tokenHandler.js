const data = require("../lib/data");
const { hash, parseJson, randomString } = require("../utilities");
const handler = {};
handler._token = {};

handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, {
      error: "Method not accepted.",
    });
  }
};

handler._token.post = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;
  if (phone && password) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        const hashedPassword = hash(password);
        if (hashedPassword === parseJson(userData).password) {
          let tokenId = randomString(20);
          let expires = Date.now() + 60 * 60 * 1000;
          const tokenObject = { phone, tokenId, expires };
          data.create("tokens", tokenId, tokenObject, (err) => {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { error: "server error." });
            }
          });
        } else {
          callback(400, { error: "Wrong password." });
        }
      } else {
        callback(400, { error: "problem in request." });
      }
    });
  } else {
    callback(400, { error: "problem in request." });
  }
};
handler._token.get = (requestProperties, callback) => {
  const id =
    typeof requestProperties.queryStringObject.id === "string" &&
    requestProperties.queryStringObject.id.trim().length === 20
      ? requestProperties.queryStringObject.id
      : false;
  if (id) {
    data.read("tokens", id, (err, tokenData) => {
      if (!err && tokenData) {
        callback(200, parseJson(tokenData));
      } else {
        callback(500, { error: "server error." });
      }
    });
  } else {
    callback(400, { error: "problem in request." });
  }
};
handler._token.delete = (requestProperties, callback) => {
  callback(200);
};
handler._token.put = (requestProperties, callback) => {
  callback(200);
};

module.exports = handler;
