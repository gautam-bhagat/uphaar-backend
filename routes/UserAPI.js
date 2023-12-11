const express = require("express");
const bypass = require("../middleware/bypass");
const Users = require("../models/Users");

const UserRouter = express.Router();

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
