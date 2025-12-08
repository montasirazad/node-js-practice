const express = require("express");
const env = require("dotenv");

env.config();
const app = express();
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
 res.send(a);
});

// 404 not found
app.use((req,res,next)=>{
    next('Requested url not found')
})

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message)
  }else{
    res.status(500).send(err)
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
