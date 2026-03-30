const handler = {};
const data = require("../lib/data");
const { hash, parseJson } = require("../utilities");
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405, {
      msg: "Method is not allowed.",
    });
  }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
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

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    data.read("users", phone, (err, userData) => {
      if (err) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };
        data.create("users", phone, userObject, (err) => {
          if (!err) {
            callback(200, {
              success: "User created successfully.",
            });
          } else {
            callback(500, {
              error: "Internal server error.",
            });
          }
        });
      } else {
        callback(400, {
          msg: "You have problem in request / user already exist.",
        });
      }
    });
  } else {
    callback(400, {
      msg: "You have problem in request.",
    });
  }
};

handler._users.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        let userObject = { ...parseJson(userData) };
        delete userObject.password;
        callback(200, userObject);
      } else {
        callback(500, {
          error: "internal server error.",
        });
      }
    });
  } else {
    callback(400, {
      error: "problem in request.",
    });
  }
};
handler._users.put = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone
      : false;

  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;
  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err, uData) => {
        const userData = { ...parseJson(uData) };
        if (!err && userData) {
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.password = hash(password);
          }

          data.update("users", phone, userData, (err) => {
            if (!err) {
              callback(200, {
                msg: "user updated successfully.",
              });
            } else {
              callback(500, {
                error: "server error.",
              });
            }
          });
        } else {
          callback(500, { error: "server error." });
        }
      });
    } else {
      callback(400, { error: "problem in request." });
    }
  } else {
    callback(400, { error: "invalid phone number." });
  }
};
handler._users.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;

  if (phone) {
    data.read("users", phone, (err, userData) => {
      if (!err && userData) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, { msg: "Deleted successfully." });
          } else {
            callback(500, { error: "server error." });
          }
        });
      } else {
        callback(500, { error: "server error." });
      }
    });
  } else {
    callback(400, {
      error: "problem in request.",
    });
  }
};
module.exports = handler;
