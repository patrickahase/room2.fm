require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const aws = require('aws-sdk');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

// set up image storage endpoint for DO spaces
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({ endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET });

//DB Service
const DbService = require('./api/dbService');

// direct to build folder
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

io.on('connection', socket => {
  // on initial connection send prompt data
  const db = DbService.getDbServiceInstance();
  const result = db.getPromptUpdate();
  result.then((data) => socket.emit("receive-prompt", data))
        .catch(err => console.log(err));

  // change to new prompt
  socket.on("send-prompt", (newPrompt) => {
    const db = DbService.getDbServiceInstance();
    const result = db.updateLivePrompt(newPrompt);
    result.then((data) => socket.broadcast.emit("receive-prompt", data))
          .catch(err => console.log(err));
  });

  // add new text response
  socket.on("send-text-response", (textResponse) => {
    const db = DbService.getDbServiceInstance();
    const result = db.insertLiveReflection(textResponse, 'text');
    result.then((data) => io.emit("receive-text-response", data))
          .catch(err => console.log(err));
  });

  // add new image response
  socket.on("send-image-response", (imageResponse) => {
    var uploadParams = {
      Bucket: 'thelongesthumstore',
      ACL: 'public-read',
      Key: 'room2-purpose-live/' + Date.now() + '.png',
      Body: imageResponse
    };
    s3.upload(uploadParams, function(err, data) {
      if(err){console.log(err);}
      io.emit("receive-image-response", data.Location);
    });
  });
  
});

const port = process.env.PORT || 33061;

// listen on 33061
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});