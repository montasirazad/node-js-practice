const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  //res.send("express error handling");
  throw new Error('there is an error')
});

app.use((err,req,res,next)=>{
    console.log(err.message);
    res.send('There was an error')
})
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
