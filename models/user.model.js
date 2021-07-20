const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: "Cannot add user without an username"
  },
  email: {
    type: String,
    required: "Cannot add user without an email",
    unique: true
  },
  password: {
    type: String,
    required: "Cannot add user without setting the password",
  }
}, {
  timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };