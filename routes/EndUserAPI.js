const express = require("express");
const bypass = require("../middleware/bypass");
const EndUsers = require("../models/EndUser");

require("dotenv").config();
const { encryptPassword, decryptPassword } = require("../utils");


const EndUserRouter = express.Router();

const jwt = require("jsonwebtoken");
const SecretKey = process.env.JWT_SECRET_KEY;

EndUserRouter.get("/:uname", bypass, async (req, res) => {
  try {
    const allUsers = await EndUsers.find({});
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

EndUserRouter.post("/add", bypass, async (req, res) => {
    let success = 0;
    try {
      const { uname, email, phone, password, ucity,ustate} = req.body;
  
      if (uname && email && password && phone && ucity && ustate) {
        // const unames = Users.findOne({ uname: uname });
        // const passwords = Users.findOne({ password: password });
        const existingUser = await EndUsers.findOne({
          $or: [{ uname: uname }, { email: email }],
        });
  
        if (existingUser) {
          // If a user with the same uname or email exists, handle the error
          let message = "Username or email already exists";
          res.status(400).json({ success: 0, message });
        } else {
          const encryptedPassword = await encryptPassword(password);
          const data = new EndUsers({
            uname: uname,
            email: email,
            password: encryptedPassword,
            phone: phone,
            ucity:ucity,
            ustate:ustate
          });
  
          await data.save();
          success = 1;
          let message = "End User Added";
          res.status(201).json({ success, message });
        }
      }
    } catch (err) {
      success = 0;
      let message = "Internal Server Error";
      res.status(500).json({ success, message });
    }
  });

module.exports = EndUserRouter;

