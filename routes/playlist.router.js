const express = require("express");
const playlistRouter = express.Router();
const { Playlist } = require("../models/playlist.model");
const { v4: uuidv4 } = require('uuid');

playlistRouter.route("/")
  .get(async (req, res) => {
    try {
      const { userId } = req.user;
      console.log({ userId });
      const playlists = await Playlist.findById(userId).populate("playlists.videos");
      res.json({ success: true, playlists })
    } catch (error) {
      res.json({ success: false })
    }
  })

  // create new playlist
  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      console.log(userId);
      const { name, video } = req.body;
      const userPlaylist = await Playlist.findById(userId);

      const newPlaylist = {
        _id: uuidv4(),
        name: name,
        videos: [video]
      };

      userPlaylist.playlists.push(newPlaylist);
      await userPlaylist.save();

      res.json({ success: true, newPlaylist })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message });
    }
  })

// add or remove video to playlist
playlistRouter.route("/:playlistId/:videoId")
  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { playlistId, videoId } = req.params;
      const userPlaylist = await Playlist.findById(userId);
      const playlistToBeUpdated = userPlaylist.playlists.find(playlist => playlist._id === playlistId);
      console.log({ playlistToBeUpdated })

      const isInPlaylist = playlistToBeUpdated.videos.find(playlistVideosId => playlistVideosId.toString() === videoId);

      isInPlaylist
        ? playlistToBeUpdated.videos.pull(videoId) : playlistToBeUpdated.videos.push(videoId);
      await userPlaylist.save();
      res.json({ success: true, playlist: playlistToBeUpdated })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message })
    }
  });


// update playlist 
playlistRouter.route("/:playlistId")
  .post(async (req, res) => {
    try {
      const { userId } = req.user;
      const { playlistId } = req.params;
      const { playlistUpdatedName } = req.body;
      const userPlaylist = await Playlist.findById(userId);
      const playlistToBeUpdated = userPlaylist.playlists.find(playlist => playlist._id === playlistId);

      console.log({ playlistToBeUpdated });

      playlistToBeUpdated.name = playlistUpdatedName;

      await userPlaylist.save();

      res.json({ success: true, updatedPlaylist: playlistToBeUpdated })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message })
    }
  })

  // delete playlist
  .delete(async (req, res) => {
    try {
      const { userId } = req.user;
      const { playlistId } = req.params;
      const userPlaylist = await Playlist.findById(userId);
      const playlistToBeDeleted = userPlaylist.playlists.find(playlist => playlist._id === playlistId);

      userPlaylist.playlists.pull(playlistToBeDeleted);
      await userPlaylist.save();
       
      res.json({ success: true, userPlaylist, deletedPlaylist: playlistToBeDeleted })
    } catch (error) {
      res.json({ success: false, errorMessage: error.message })
    }
  })

module.exports = playlistRouter;