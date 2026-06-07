const express = require("express");

const app = express();
app.use(express.urlencoded());
app.use(express.static(__dirname + "/public/",{index:'home.html'}));

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("This is homepage with post request.");
});
app.listen(5000, () => {
  console.log(`Listening to port 5000`);
});

// **used express raw,json,text function
// express.json()
// express.raw()
// express.Router()
// express.static()
// express.text()
// express.urlencoded() 
// By default router is case insensitive 