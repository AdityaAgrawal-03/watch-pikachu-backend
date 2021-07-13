const express = require("express");
const historyRouter = express.Router();

historyRouter.route("/")
  .get(async (req, res) => {
    try {
      res.json({ success: true })
    } catch (error) {
      res.status(404).json({ success: false })
    }
  })

module.exports = historyRouter;