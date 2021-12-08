const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//DB Service
const DbService = require('./dbService');

// set up image storage endpoint for DO spaces
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
const s3 = new aws.S3({ endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_KEY,
  secretAccessKey: process.env.SPACES_SECRET });

//upload file function
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'thelongesthumstore',
    acl: 'public-read',
    key: (req, file, callBack) => { callBack(null, 'room2-image-responses/' + Date.now() + file.originalname.replace(/ /g,'-')) }
  })
}).array('upload', 1);

// GET api/getScheduleInit
// Get the current prompt + artist + ??
router.get('/getScheduleInit', (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.getScheduleInit();
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// POST api/getScheduleUpdate
// Get the current prompt + artist + ??
router.post('/getScheduleUpdate', (req, res) => {
  const {lastResponseID} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.getScheduleUpdate(lastResponseID);
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// GET api/getEmojisUpdate
// Get the current prompt + artist + ??
router.post('/getEmojisUpdate', (req, res) => {
  const {emoji1, emoji2, emoji3} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.getEmojisUpdate(emoji1, emoji2, emoji3);
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// POST api/insertText
// Inserts a new text response into the database
router.post('/insertTextResponse', (req, res) => {
  const {reflectText} = req.body;
  const {reflectTime} = Date.now();
  const db = DbService.getDbServiceInstance();
  const result = db.insertNewReflectText(reflectText, reflectTime);
  result.then(data => res.json({ sucess: true}))
        .catch(err => console.log(err));
});
/* 
// Could possibly move the Date.now call to the server? not sure it really makes a difference
submitTextResponse() {
  // change to take event as way to grab element?
  const reflecttext = document.getElementById('inputtext').value;
  document.getElementById('inputtext').value = '';
  fetch(`/api/insertText`, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({reflectText : reflecttext, reflectTime: Date.now() })
  })
  .then(response => response.json());
} */

// POST api/insertImage
// Inserts a new images response into the database
router.put('/insertImageResponse', (req, res) => {
  upload(req, res, (error) => {
    if(error) { console.log(error) } else {
      const reflectImage = req.files[0].key;
      console.log(reflectImage)
      const db = DbService.getDbServiceInstance();
      const result = db.insertNewReflectImage(reflectImage);
      result.then(data => res.json({ sucess: true}))
            .catch(err => console.log(err));
    }
  });  
});
/* 
// Could possibly move the Date.now call to the server? not sure it really makes a difference
submitImageResponse() {
  // change to take event as way to grab element?
  const reflectdraw = document.getElementById('surface').toDataURL();
  fetch(`/api/insertText`, {
    headers: {
      'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({reflectImage : reflectdraw, reflectTime: Date.now() })
  })
  .then(response => response.json());
  // reset canvas via width? or new function
  // do I need to send the aspect ratio too?
} */

module.exports = router;