require("dotenv").config();
const express = require("express");
const path = require("path");
var cors = require("cors");

//init app and body parser
const app = express();
app.use(express.json());
/* app.use(express.urlencoded({limit: '50mb'})); */
app.use(cors());

// load api endpoints for client app
//const endPoints = require("./api/room2ClientAPI");

// direct to build folder
app.use("/", express.static(path.join(__dirname, "home")));
app.use("/async", express.static(path.join(__dirname, "async/build")));
app.use("/sync", express.static(path.join(__dirname, "sync/build")));

// serve index - '/' or '*' ?
app.get("/", (req, res) => {
  console.log(1);
  res.sendFile(__dirname, "/home/index.html");
});
app.get("/async", (req, res) => {
  console.log(2);
  res.sendFile(__dirname, "/async/build/index.html");
});
app.get("/sync", (req, res) => {
  console.log(3);
  res.sendFile(__dirname, "/sync/build/index.html");
});

// reroute API calls to API endpoints script
//app.use('/api/', endPoints );

// look more into process stuff
const port = process.env.PORT || 33061;

// listen on 33061
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
