const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config();
const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("jwt-22-dec-2025");
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port : ${process.env.PORT}`)
);
