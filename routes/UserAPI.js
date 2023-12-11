const express = require("express");
const bypass = require("../middleware/bypass");
const Users = require("../models/Users");

require("dotenv").config();

const UserRouter = express.Router();

const jwt = require("jsonwebtoken");
const SecretKey = process.env.JWT_SECRET_KEY;

UserRouter.get("/:uname", bypass, async (req, res) => {
  try {
    const allUsers = await Users.find({});
    const matchingUser = allUsers.find(
      (user) => user.uname === req.params.uname
    );

    if (matchingUser) {
      res.send("uname valid");
    } else {
      res.send("invalid");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

UserRouter.post("/login", bypass, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const fetchedUser = await Users.findOne({ email: email });
      if (fetchedUser) {
        if (password === fetchedUser.password) {
          let data = {
            id: fetchedUser._id,
          };

          const token = jwt.sign(data, SecretKey);
          success = 1;
          let message = "Logged in";
          res.status(200).json({ success, token, message });
        }
      } else {
        success = 0;
        let message = "Internal Server Error";
        res.status(500).json({ success, message });
      }
    } else {
      success = 0;
      let message = "Internal Server Error";
      res.status(500).json({ success, message });
    }
  } catch (error) {
    success = 0;
    let message = "Internal Server Error";
    res.status(500).json({ success, message });
  }
});

UserRouter.post("/add", bypass, async (req, res) => {
  let success = 0;
  try {
    const { uname, email, password } = req.body;

    if (uname && email && password) {
      //     const saltRounds = 10;
      //     const salt = await bcrypt.genSalt(saltRounds);

      // // Hash the password with the salt
      // const hashedPassword = await bcrypt.hash(password, salt);

      // // Create a new user with the hashed password
      // const newUser = new User({
      //     uname: uname,
      //     email:email,
      //     password: hashedPassword
      // });

      // // Save the user to the database
      // await newUser.save();
      const data = new Users(req.body);
      data.save();
      success = 1;
      let message = "User Added";
      res.status(201).json({ success, message });
    }
  } catch (err) {
    success = 0;
    let message = "Internal Server Error";
    res.status(500).json({ success, message });
  }
});

module.exports = UserRouter;
