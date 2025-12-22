const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkLogIn = require("../middleware/checkLogIn");
const router = express.Router();

const User = new mongoose.model("User_21_dec_2025", userSchema);

// create user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      age: req.body.age,
      password: hashedPassword,
    });

    const data = await newUser.save();
    res.status(200).json({
      message: "user created successfully",
      data: {
        name: data.name,
        username: data.username,
        id: data._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error..!");
  }
});

// login user

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
          { username: user[0].username, id: user[0]._id },
          process.env.JWT_SECRET,
          { expiresIn: "1hr" }
        );
        res.status(200).json({
          access_token: token,
          message: `Log in successful. welcome ${user[0].username}`,
        });
      } else {
        res.status(401).send("Authentication failed.");
      }
    } else {
      res.status(401).send("Authentication failed.");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send("Authentication failed.");
  }
});

// login user with jwt

router.get("/jwt-auth", checkLogIn, async (req, res) => {
  try {
    const user = {
      username: req.username,
      userId: req.userid,
    };
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send("Authentication failed.");
  }
});

module.exports = router;
