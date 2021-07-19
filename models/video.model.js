const mongoose = require("mongoose");
const { Schema } = mongoose;
require("mongoose-type-url");

const VideoSchema = new Schema({
  url: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot add a video without url",
    unique: true
  },
  title: {
    type: String,
    required: "Cannot add video without title",
    unique: true
  },
  thumbnail: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot add video without thumbnail"
  },
  statistics: {
    type: String,
    required: "Cannot add video without statistics",
  },
  description: {
    type: String,
    required: "Cannot add video without description",
    
  },
  channelName: {
    type: String,
    required: "Cannot add video without channelName",
  },
  channelLogo: {
    type: mongoose.SchemaTypes.Url,
    required: "Cannot add video without channelLogo",
  },
}, {
  timestamps: true
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };