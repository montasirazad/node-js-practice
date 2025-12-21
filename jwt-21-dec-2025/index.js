const express = require("express");
const dotEnv = require("dotenv");
const { default: mongoose } = require("mongoose");
const userHandler = require("./userHandler/userHandler");
dotEnv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from localhost");
});

app.use("/user", userHandler);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Listening to port ${process.env.PORT}`)
);
