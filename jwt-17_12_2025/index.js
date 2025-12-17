const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const userHandler = require("./routeHandler/userHandler");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("JWT authentication practice");
});

app.use("/user", userHandler);

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
