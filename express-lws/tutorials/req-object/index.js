const port = 5000;
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const adminRoute = express.Router();
app.use("/admin", adminRoute);

app.get("/user/:ppl", (req, res) => {
  console.log(req.originalUrl);
  console.log(req.url);
  console.log(req.path);
  console.log(req.cookies);
  res.send("Req object");
});

adminRoute.get("/dashboard", (req, res) => {
  console.log(req.originalUrl);
  console.log(req.url);
  console.log('path :',req.path);
  res.send("we are in admin route");
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
