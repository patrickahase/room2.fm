require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');
let instance = null;

// Db Config
const connectSettings = {
  // currently set to public connection
  host: process.env.ROOM2_DB_HOST,
  user: process.env.ROOM2_DB_USER,
  multipleStatements: true,
  password: process.env.ROOM2_DB_PASSWORD,
  database: 'room2live',
  supportBigNumbers : true, 
  port: 25060,
  insecureAuth: true
};

const connection = mysql.createConnection(connectSettings);

connection.connect((err) => {
  if(err) { console.log(err.message) }
  console.log('db ' + connection.state );
});

const sqlQueries = {
  getScheduleQ:       `SELECT CURRENT_ARTIST AS 'currentArtist', CURRENT_PROMPT AS 'currentPrompt', PROMPT_TYPE AS 'promptType',
                        EMOJI_1 AS 'emoji1', EMOJI_2 AS 'emoji2', EMOJI_3 AS 'emoji3' FROM LIVE_SCHEDULE WHERE id = 1;`, 
  getResponseUpdateQ: `SELECT * FROM RESPONSES WHERE (RESPONSE_DATETIME > now() - interval 3 minute) AND (id > ?);`, 
  getEmojisQ:         `SELECT ALT_TEXT AS 'altText', EMOJI_STRING AS 'emojiString' FROM EMOJI_STORAGE WHERE NAME = (? OR ? OR ?);`,
  /* insertTextQ:        `INSERT INTO TEXT_RESPONSES (RESPONSE) VALUE (?);` */
  insertResponseQ:    `INSERT INTO RESPONSES (RESPONSE) VALUE (?);`
}

class DbService {

  static getDbServiceInstance() {
    return instance ? instance: new DbService();
  }

  async getScheduleInit() {
    try { const scheduleData = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.getScheduleQ, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return [scheduleData, []];
    } catch(error) { console.log(error); }
  }

  async getScheduleUpdate(lastResponseID) {
    let insertData = [lastResponseID];
    try { const scheduleData = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.getScheduleQ, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          const responseData = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.getResponseUpdateQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return [scheduleData, responseData];
    } catch(error) { console.log(error); }
  }

  async getEmojisUpdate(emoji1, emoji2, emoji3) {
    let insertData = [emoji1, emoji2, emoji3];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.getEmojisQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

  async insertNewReflectText(reflectText) {
    let insertData = [reflectText];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.insertResponseQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }
  async insertNewReflectImage(reflectImage) {
    let insertData = [reflectImage];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.insertResponseQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

 /*  async insertNewReflectImage(reflectImage, reflectTime) {
    let insertData = [reflectImage, reflectTime, reflectImage, reflectTime];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.insertImageQuery, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  } */

}

module.exports = DbService;