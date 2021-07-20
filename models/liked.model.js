const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }]
}, {
    timestamps: true
  });

const LikedVideo = mongoose.model("LikedVideo", LikedVideoSchema);

module.exports = { LikedVideo };