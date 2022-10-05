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
    key: (req, file, callBack) => { callBack(null, 'room2-async-cycle_'+ (parseInt(file.originalname.replace(/ /g,'-').substr(6,1))) +'/' + Date.now() + file.originalname.replace(/ /g,'-')) }
  })
}).array('upload', 1);

//upload file function
const uploadLive = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'thelongesthumstore',
    acl: 'public-read',
    key: (req, file, callBack) => { callBack(null, 'room2-live/' + Date.now() + file.originalname.replace(/ /g,'-')) }
  })
}).array('upload', 1);

// POST api/insertTextReflectionGetResponses
// Inserts a new text response into the database and returns that cycles
// responses
router.post('/insertTextReflectionGetResponses', (req, res) => {
  const {reflection, cycleTable} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.insertReflectionGetResponses(reflection, 'text', parseInt(cycleTable));
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// PUT api/insertImageReflectionGetResponses
// Inserts a new image response into the storage, send url to database and 
// returns that cycles responses
router.put('/insertImageReflectionGetResponses', (req, res) => {
  upload(req, res, (error) => {
    if(error) { console.log(error) } else {
      // hack to get around multipart form data - we're sending the cycle number
      // in the name anyway so extract that part and make it an int (and minus 1
      // to keep our naming convention intact)
      let cycleTable = parseInt(req.files[0].originalname.substr(6,1));
      const reflectImage = req.files[0].key;
      const db = DbService.getDbServiceInstance();
      const result = db.insertReflectionGetResponses(reflectImage, 'image', cycleTable);
      result.then(data => res.json({ data: data }))
            .catch(err => console.log(err));
    }
  });  
});

router.post('/testLookup', (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.testLookup();
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// LIVE CLIENT API

// POST api/insertLiveTextReflection
// Inserts a new text response into the live database 
router.post('/insertLiveTextReflection', (req, res) => {
  const {reflection} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.insertLiveReflection(reflection, 'text');
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// PUT api/insertLiveImageReflection
// Inserts a new image response into the storage, send url to live database
router.put('/insertLiveImageReflection', (req, res) => {
  uploadLive(req, res, (error) => {
    if(error) { console.log(error) } else {
      const reflectImage = req.files[0].key;
      const db = DbService.getDbServiceInstance();
      const result = db.insertLiveReflection(reflectImage, 'image');
      result.then(data => res.json({ data: data }))
            .catch(err => console.log(err));
    }
  });  
});

// POST api/getLiveUpdate
// send the id of the last response received
// return current prompt, artist & any responses within the last three minutes
// that have an id > last response received
router.post('/getLiveUpdate', (req, res) => {
  const {lastResponseID} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.getLiveDBUpdate(lastResponseID);
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// GET api/getLiveMobileUpdate
// return latest prompt for mobile
router.get('/getLiveMobileUpdate', (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.getLiveMobileDBUpdate();
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

router.get('/desktop', (req, res) => {
  res.sendFile(__dirname, '../desktop/build/index.html');
});

module.exports = router;