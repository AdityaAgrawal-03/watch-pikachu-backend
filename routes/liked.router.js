const express = require("express");
const likedRouter = express.Router();
const { LikedVideo } = require("../models/liked.model");

likedRouter.route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      const likedVideos = await LikedVideo.findById(userId).populate('videos');
      
      res.json({ success: true, likedVideos })
    } catch (error) {
      res.status(404).json({ success: false })
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { video } = req.body;
      console.log(video)
      const likedVideos = await LikedVideo.findById(userId);
      likedVideos.videos.push(video);
      await likedVideos.save();

      res.json({ success: true, likedVideos, message: "video successfully added to liked videos" })
    } catch (error) {
      res.json({ success: false })
    }
  })

module.exports = likedRouter;