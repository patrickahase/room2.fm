const express = require("express");
const path = require("path");
var cors = require("cors");

//init app and body parser
const app = express();
app.use(express.json());
app.use(cors());

// direct to build folder
app.use("/", express.static(path.join(__dirname, "client/dist")));

// serve index - '/' or '*' ?
app.get("/*", (req, res) => {
  console.log(1);
  res.sendFile(__dirname, "client/dist/index.html");
});
// serve index - '/' or '*' ?
app.get("/async", (req, res) => {
  console.log(2);
  res.sendFile(__dirname, "client/dist/index.html");
});
// serve index - '/' or '*' ?
app.get("/sync", (req, res) => {
  console.log(3);
  res.sendFile(__dirname, "client/dist/index.html");
});

// look more into process stuff
const port = process.env.PORT || 33064;

// listen on 33061
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
