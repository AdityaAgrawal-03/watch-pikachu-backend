const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: "Cannot create playlist without a name",
    unique: true
  },
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }]
}, {
  timestamps: true
});

const Playlist = mongoose.Model("Playlist", PlaylistSchema);

module.exports = { Playlist };