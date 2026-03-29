const { hash, parsedJson } = require("../helpers/utilities");
const data = require("../lib/lib");
const handler = {};
handler._user = {};
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._user.post = (requestProperties, callback) => {
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

  if (firstName && lastName && phone && tosAgreement && password) {
    data.read("users", phone, (err, user) => {
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
              message: "User created successfully.",
            });
          } else {
            callback(500, {
              error: "Problem in your request / data already exist.",
            });
          }
        });
      } else {
        callback(400, {
          error: "Problem in your request / data already exist.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Problem in your request / data.",
    });
  }
};
handler._user.get = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    data.read("users", phone, (err, user) => {
      const userData = { ...parsedJson(user) };
      if (!err && userData) {
        delete userData.password;
        callback(200, userData);
      } else {
        callback(404, {
          err: "Requested user not found.",
        });
      }
    });
  } else {
    callback(404, {
      err: "Problem in request.",
    });
  }
};
handler._user.put = (requestProperties, callback) => {
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

  if (phone) {
    if (firstName || lastName || password) {
      data.read("users", phone, (err, uData) => {
        const userData = { ...parsedJson(uData) };
        if (firstName) {
          userData.firstName = firstName;
        }
        if (lastName) {
          userData.lastName = lastName;
        }
        if (password) {
          userData.password = password;
        }
        data.update("users", phone, userData, (err) => {
          if (!err) {
            callback(200, {
              msg: "User data updated successfully.",
            });
          } else {
            callback(500, {
              error: "Internal server error.",
            });
          }
        });
      });
    } else {
      callback(400, {
        error: "Problem in request.",
      });
    }
  } else {
    callback(400, {
      error: "Invalid phone number.",
    });
  }
};
handler._user.delete = (requestProperties, callback) => {
  const phone =
    typeof requestProperties.queryStringObject.phone === "string" &&
    requestProperties.queryStringObject.phone.trim().length === 11
      ? requestProperties.queryStringObject.phone
      : false;
  if (phone) {
    data.read("users", phone, (err, user) => {
      if (!err && user) {
        data.delete("users", phone, (err) => {
          if (!err) {
            callback(200, {
              msg: "user deleted successfully.",
            });
          } else {
            callback(500, {
              error: "Internal server error.",
            });
          }
        });
      } else {
        callback(500, {
          error: "User not found.",
        });
      }
    });
  } else {
    callback(400, {
      error: "Problem in request.",
    });
  }
};
module.exports = handler;
