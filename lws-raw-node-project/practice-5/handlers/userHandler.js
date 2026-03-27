const handler = {};
const data = require("../lib/data");
const { hash } = require("../utilities");
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
  callback(200, {
    res: "ok",
  });
};
handler._users.put = (requestProperties, callback) => {
  callback(200, {
    res: "ok",
  });
};
handler._users.delete = (requestProperties, callback) => {
  callback(200, {
    res: "ok",
  });
};
module.exports = handler;
