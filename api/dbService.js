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
  database: 'room2async',
  supportBigNumbers : true, 
  port: 25060,
  insecureAuth: true
};

const connection = mysql.createConnection(connectSettings);

connection.connect((err) => {
  if(err) { console.log(err.message) }
  console.log('db ' + connection.state );
});

// to avoid sql injections use the cycleTable number to select from array of queries
const sqlAsyncQueries = [ `INSERT INTO CYCLE_1 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_1;`,
                     `INSERT INTO CYCLE_2 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_2;`,
                     `INSERT INTO CYCLE_3 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_3;`,
                     `INSERT INTO CYCLE_4 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_4;`,
                     `INSERT INTO CYCLE_5 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_5;`,
                     `INSERT INTO CYCLE_6 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_6;`,
                     `INSERT INTO CYCLE_7 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_7;`,
                     `INSERT INTO CYCLE_8 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_8;`,
                     `INSERT INTO CYCLE_9 (RESPONSE, RESPONSE_TYPE) VALUES (?, ?); SELECT * FROM CYCLE_9;`];

const sqlLiveQueries = {
  insertLiveResponseQ: `INSERT INTO LIVE_RESPONSES (RESPONSE, RESPONSE_TYPE) VALUES (?, ?);`,
  getScheduleQ:        `SELECT CURRENT_ARTIST AS 'currentArtist', CURRENT_PROMPT AS 'currentPrompt' FROM LIVE_SCHEDULE WHERE id = 1;`, 
  getPromptQ:          `SELECT CURRENT_PROMPT AS 'currentPrompt' FROM LIVE_SCHEDULE WHERE id = 1;`, 
  getResponseUpdateQ:  `SELECT * FROM LIVE_RESPONSES WHERE (RESPONSE_DATETIME > now() - interval 3 minute) AND (id > ?);`,
} 

class DbService {

  static getDbServiceInstance() {
    return instance ? instance: new DbService();
  }

  // run when inputing reflections and return responses
  async insertReflectionGetResponses(reflection, reflectType, cycleTable) {
    let insertData = [reflection, reflectType];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlAsyncQueries[cycleTable], insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }
  
  async testLookup() {
    try { const response = await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM CYCLE_5;`, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

  async insertLiveReflection(reflection, reflectType) {
    let insertData = [reflection, reflectType];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlLiveQueries.insertLiveResponseQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

  async getLiveDBUpdate(lastResponseID) {
    let insertData = [lastResponseID];
    try { const scheduleData = await new Promise((resolve, reject) => {
            connection.query(sqlLiveQueries.getScheduleQ, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          const responseData = await new Promise((resolve, reject) => {
            connection.query(sqlLiveQueries.getResponseUpdateQ, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return [scheduleData, responseData];
    } catch(error) { console.log(error); }
  }
  
  async getLiveMobileDBUpdate() {
    try { const promptData = await new Promise((resolve, reject) => {
            connection.query(sqlLiveQueries.getPromptQ, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return [promptData];
    } catch(error) { console.log(error); }
  }

}

module.exports = DbService;