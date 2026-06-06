const express = require("express");
const app = express();
const admin = express();
app.use("/admin", admin);
admin.get("/dashboard", (req, res) => {
    console.log(admin.mountpath);
  res.send("admin-dashboard route");
});
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("test");
});
app.listen(5000, () => {
  console.log("Listening to port 5000");
});
