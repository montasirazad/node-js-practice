const handler = {};
handler._token = {};
const { hash, parsedJson, randomString } = require("../helpers/utilities");
const data = require("../lib/lib");
handler.tokenHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._token[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
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
      let hashedPassword = hash(password);
      if (hashedPassword === parsedJson(userData).password) {
        let tokenId = randomString(20);
        let expires = Date.now() + 60 * 60 * 1000;
        const tokenObject = { phone, id: tokenId, expires };
        data.create("tokens", tokenId, tokenObject, (err) => {
          if (!err) {
            callback(200, tokenObject);
          } else {
            callback(500, {
              error: "Server error",
            });
          }
        });
      } else {
        callback(400, {
          error: "Password is wrong.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Problem in request.",
    });
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
        callback(200, parsedJson(tokenData));
      } else {
        callback(500, {
          error: "Server error.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Problem in request.",
    });
  }
};
handler._token.put = (requestProperties, callback) => {
  callback(200, { msg: "success" });
};
handler._token.delete = (requestProperties, callback) => {
  callback(200, { msg: "success" });
};

module.exports = handler;
