const jwt = require("jsonwebtoken");
const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { username, userid } = decoded;
    req.username = username;
    req.userid = userid;
    console.log(req.userid);
    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

module.exports = checkLogin;
