const jwt = require("jsonwebtoken");

const checkLogIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userid } = decoded;
    req.username = username;
    req.userid = userid;
    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

module.exports = checkLogIn;
