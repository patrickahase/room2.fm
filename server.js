require('dotenv').config();
const express = require('express');
const path = require('path');
var cors = require('cors');

//init app and body parser
const app = express();
app.use(express.json());
app.use(cors());

// load api endpoints for client app
const endPoints = require('./api/room2ClientAPI');

// direct to build folder
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
  res.sendFile(__dirname, '/desktop/build/index.html');
});
/* 
app.get('/mobile/', (req, res) => {
  res.sendFile(__dirname, '/desktop/build/index.html');
});

app.get('/desktop', (req, res) => {
  res.sendFile(__dirname, '/desktop/build/index.html');
}); */

// reroute API calls to API endpoints script
app.use('/api/', endPoints );

const port = process.env.PORT || 33061;

// listen on 33061
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});