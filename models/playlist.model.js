const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  playlists: [{
    _id: String,
    name: {
      type: String,
      required: "Cannot create playlist without a name"
    },
    videos: [{
      type: Schema.Types.ObjectId,
      ref: "Video"
    }]
  }],
}, {
    timestamps: true
  });

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = { Playlist };