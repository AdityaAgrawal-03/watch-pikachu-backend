const express = require('express');
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { initializeDBConnection } = require("./db/db.connect");
const videos = require("./routes/video.router");
const playlists = require("./routes/playlist.router");
const history = require("./routes/history.router");
const liked = require("./routes/liked.router");
const signup = require("./routes/signup.router");
const login = require("./routes/login.router")
const { authVerify } = require("./middlewares/authVerify");

app.use(bodyParser.json());
app.use(cors());

initializeDBConnection();

app.get('/', (req, res) => {
 res.send("Hello Pikachu");
});

app.use("/login", login);
app.use("/signup", signup);
app.use("/videos", videos);

app.use(authVerify);
app.use("/liked", liked);
app.use("/history", history);
app.use("/playlists", playlists);

app.listen(3000, () => {
  console.log('server started');
});