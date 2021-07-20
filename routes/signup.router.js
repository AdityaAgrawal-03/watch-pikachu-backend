const express = require("express");
const signupRouter = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const secret = process.env['secret'];
const { User } = require("../models/user.model");
const { LikedVideo } = require("../models/liked.model");
const { HistoryVideo } = require("../models/history.model");
const { Playlist } = require("../models/playlist.model");

signupRouter.route("/")
  .get(async (req, res) => {

    res.json({ success: true })
  })

  .post(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      
      const user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "24h" });

      const NewLikedVideo = new LikedVideo({
        _id: user._id
      });
      const NewHistoryVideo = new HistoryVideo({
        _id: user._id
      });
      
      const NewPlaylist = new Playlist({
        _id: user._id,
        playlists:[{
          _id: uuidv4(),
          name: "Watch Later",
          videos: []  
        }]
      });

      await NewLikedVideo.save();
      await NewHistoryVideo.save();
      await NewPlaylist.save();
      
      res.json({ success: true, user, token, message: "User successfully added" })
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false,errorMessage: error.message })
    }
  })

module.exports = signupRouter;