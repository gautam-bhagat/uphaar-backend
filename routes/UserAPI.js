const express = require("express");
const bypass = require("../middleware/bypass");
const Users = require("../models/Users");

const {encryptPassword,decryptPassword} = require('../utils')

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

        const match = await decryptPassword(password,fetchedUser.password)
        console.log(match)
        if (match) {
            
          let data = {
            id: fetchedUser._id,
          };

          const token = jwt.sign(data, SecretKey);
          success = 1;
          let message = "Logged in";
          res.status(200).json({ success, token, message });
        }
      else {
        success = 0;
        let message = "password doesn't matched";
        //throw new Error("Password doesn't matched !");

        res.status(500).json({ success, message });
      }
    }
    } else {
      success = 0;
      let message = "Invalid email or password";
      //throw new Error("Invalid email or password");

      res.status(500).json({ success, message });
    }
  } catch (error) {
    success = 0;
    res.status(500).json({ success, error});
}
});

UserRouter.post("/add", bypass, async (req, res) => {
  let success = 0;
  try {
    const { uname, email, password } = req.body;

    if (uname && email && password) {
    //   const uname=Users.findOne({uname:uname})
    //   const password=Users.findOne({password:password})
    let fetchedUser = await Users.findOne({ email: email });
    let fetchedU = await Users.findOne({ uname: uname });

    if(fetchedUser || fetchedU){
      return res.send(300).json({success :0, message : "uname or email exists!!"})
    }
      const encryptedPassword = await encryptPassword(password);
      const data = new Users({
        uname : uname,
        password : encryptedPassword,
        email : email
      });

      await data.save();
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
