const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
dotEnv.config();

const app = express();
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017/tasks")
  .then(() => console.log("Connected to mongodb://127.0.0.1:27017/tasks"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.use("/task", todoHandler);

app.listen(3000, () => console.log("Listening to port 3000"));
