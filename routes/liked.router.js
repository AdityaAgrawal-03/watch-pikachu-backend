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
      res.json({ success: false })
    }
  })

  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { video } = req.body;
      
      const likedVideos = await LikedVideo.findById(userId);
      const isInLiked = likedVideos.videos.find(videoId => videoId.toString() === video._id )

      console.log({ isInLiked })

      isInLiked ? likedVideos.videos.pull(video) : likedVideos.videos.push(video);
      
      await likedVideos.save();

      res.json({ success: true, likedVideos, message: "liked videos updated" })
    } catch (error) {
      res.json({ success: false })
    }
  })

module.exports = likedRouter;