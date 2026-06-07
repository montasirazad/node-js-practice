const express = require("express");
const adminRouter = require("./route/adminRoute");
const port = 5000;
const app = express();
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("home page");
});
 
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
