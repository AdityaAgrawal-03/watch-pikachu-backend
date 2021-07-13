const express = require("express");
const likedRouter = express.Router();

likedRouter.route("/")
  .get(async (req, res) => {
    try {
      res.json({ success: true })
    } catch (error) {
      res.status(404).json({ success: false })
    }
  })

  .post(async (req, res) => {
    try {
      res.json({ success: true })
    } catch (error) {
      res.json({ success: false })
    }
  })

module.exports = likedRouter;