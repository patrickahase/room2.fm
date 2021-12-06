const express = require('express');
const router = express.Router();

//DB Service
const DbService = require('./dbService');

// GET api/getScheduleInit
// Get the current prompt + artist + ??
router.get('/getScheduleInit', (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.getScheduleInit();
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// GET api/getScheduleUpdate
// Get the current prompt + artist + ??
router.get('/getScheduleUpdate', (req, res) => {
  const db = DbService.getDbServiceInstance();
  const result = db.getScheduleUpdate();
  result.then(data => res.json({ data: data }))
        .catch(err => console.log(err));
});

// POST api/insertText
// Inserts a new text response into the database
router.post('/insertText', (req, res) => {
  const {reflectText, reflectTime} = req.body;
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
router.post('/insertImage', (req, res) => {
  const {reflectImage, reflectTime} = req.body;
  const db = DbService.getDbServiceInstance();
  const result = db.insertNewReflectImage(reflectImage, reflectTime);
  result.then(data => res.json({ sucess: true}))
        .catch(err => console.log(err));
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