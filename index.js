const express = require('express');
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { initializeDBConnection } = require("./db/db.connect");
const videos = require("./routes/video.router");
const playlists = require("./routes/playlist.router");
const history = require("./routes/history.router");
const liked = require("./routes/liked.router");

app.use(bodyParser.json());
app.use(cors())

initializeDBConnection();

app.use("/videos", videos);
app.use("/liked", liked);
app.use("/history", history);
app.use("/playlists", playlists);

app.get('/', (req, res) => {
 res.send("Hello Pikachu");
});

app.listen(3000, () => {
  console.log('server started');
});