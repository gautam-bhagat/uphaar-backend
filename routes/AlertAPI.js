const express = require("express");
const AlertService = require("../models/Alerts");

require("dotenv").config();

// app route
const AlertRouter = express.Router();
const bypass = require("../middleware/bypass");

AlertRouter.get("/get", bypass, (req, res) => {
  let success = 1;
  res.status(201).json({ success, message: "ALERT data working" });
});
AlertRouter.post("/add", bypass, async (req, res) => {
  const { latitude, longitude, deviceLocation } = req.body;
  try {
    if (latitude && longitude && deviceLocation) {
      const data = new AlertService(req.body);
      data.save();
      let success = 1;

      res.status(201).json({ success, message: "ALERT data added" });
    }
  } catch (err) {
    console.log(err);
    let success = 0;

    res.status(500).json({ success, message: "Error" });
  }
});

module.exports = AlertRouter;
