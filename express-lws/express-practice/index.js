const port = 5000;
const express = require("express");
const app = express();

// app.use(express.raw());
app.use(express.json());
//app.use(express.text());
//app.use(express.urlencoded());
app.use(express.static(__dirname + "/public/", { index: "home.html" }));
app.get("/", (req, res) => {
  res.send("Home page");
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send(`Data from body: ${req.body.name}`);
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
