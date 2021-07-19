const express = require("express");
const historyRouter = express.Router();
const { HistoryVideo } = require("../models/history.model");

historyRouter.route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      const historyVideos = await HistoryVideo.findById(userId).populate("videos");
      res.json({ success: true, historyVideos });
    } catch (error) {
      res.status(404).json({ success: false })
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { video } = req.body;
      const historyVideos = await HistoryVideo.findById(userId);
      historyVideos.videos.push(video);
      await historyVideos.save();
      res.json({ success: true, historyVideos })
    } catch (error) {
      res.status(401).json({ success: false })
    }
  })

module.exports = historyRouter;