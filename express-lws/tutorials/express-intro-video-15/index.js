const express = require("express");

const app = express();
app.use(express.raw());
app.use(express.static(__dirname + "/public/",{index:'home.html'}));
app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.post("/", (req, res) => {
  console.log(req.body.toString);
  res.send("This is homepage with post request.");
});
app.listen(5000, () => {
  console.log(`Listening to port 5000`);
});

//**used express raw,json,text function
// */
