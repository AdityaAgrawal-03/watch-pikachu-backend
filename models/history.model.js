const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistoryVideoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  videos: [{
    type: Schema.Types.ObjectId,
    ref: "Video"
  }]
}, {
    timestamps: true
  });

const HistoryVideo = mongoose.model("HistoryVideo", HistoryVideoSchema);

module.exports = { HistoryVideo };