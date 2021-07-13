const mongoose = require("mongoose");
const mySecretKey = process.env['uri'];

async function initializeDBConnection() {
  try {
    await mongoose.connect(mySecretKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("succesfully connected");
  } catch (error) {
    console.error("connection failed: ", error);
  }
}

module.exports = { initializeDBConnection };