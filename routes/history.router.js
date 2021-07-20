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
      res.json({ success: false })
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { video } = req.body;
      const historyVideos = await HistoryVideo.findById(userId);
      const isInHistory = historyVideos.videos.find(videoId => videoId.toString() === video._id )
      isInHistory  
      ? historyVideos.videos.pull(video)
      : historyVideos.videos.push(video);
      await historyVideos.save();
      res.json({ success: true, historyVideos })
    } catch (error) {
      res.json({ success: false,  errorMessage: error.message })
    }
  })

  .delete(async (req, res) => {
    try {
      const { userId } = req.user;
      const historyVideos = await HistoryVideo.findById(userId);
      historyVideos.videos = [];
      await historyVideos.save();
      res.json({ success: true, historyVideos })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message })
    }
  })

module.exports = historyRouter;