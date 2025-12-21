const express = require("express");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const userSchema = require("../schema/userSchema");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middleware/checkLogin");
const router = express.Router();
const User = new mongoose.model("User_20_dec_2025", userSchema);

// Sign up user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    const data = await newUser.save();
    console.log(data);
    res.send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Log in user
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            username: user[0].username,
            userid: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" }
        );
        res.status(200).json({
          access_token: token,
          message: "Log in successful",
        });
      } else {
        res.status(401).send("Authentication failed !");
      }
    } else {
      res.status(401).send("Authentication failed !");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/jwt-auth", checkLogin, async (req, res) => {
  try {
    const user = {
      username: req.username,
      userId: req.userid,
    };
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send("Authentication failed !");
  }
});

module.exports = router;
