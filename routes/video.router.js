const express = require("express");
const videoRouter = express.Router();
const { Video } = require("../models/video.model");

videoRouter.route("/")
  .get(async (req, res) => {
    try {
      const videos = await Video.find({})
      res.json({ success: true, videos });
    } catch (error) {
      res.status(404).json({ success: false, message: "unable to retrieve videos" })
    }
  })

  .post(async (req, res) => {
    try {
      const video = req.body;
      const addedVideo = new Video(video);
      await addedVideo.save();
      res.json({ success: true, video: addedVideo, message: "video succesfully added" })
    } catch (error) {
      res.status(500).json({ success: false, message: "unable to add video" })
    }
  })

module.exports = videoRouter;