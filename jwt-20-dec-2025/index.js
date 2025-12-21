const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const handleUser = require("./handleUser/handleUser");
dotEnv.config();

const app = express();
app.use(express.json());
// Mongo db connect

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db connected successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("jwt-20-dec-2025");
});

app.use("/user", handleUser);

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
