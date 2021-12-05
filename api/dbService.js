require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');
let instance = null;

// Db Config
const connectSettings = {
  // currently set to public connection
  /* host: process.env.ROOM2_DB_HOST, */
  host: 'room2live-do-user-9677059-0.b.db.ondigitalocean.com',
  /* user: process.env.ROOM2_DB_USER, */
  user: 'doadmin',
  multipleStatements: true,
  /* password: process.env.ROOM2_DB_PASSWORD, */
  password: 'PLSVaCHytzwqbGeG',
  database: 'room2live',
  supportBigNumbers : true,
  port: 25060,
  insecureAuth: true
};

const connection = mysql.createConnection(connectSettings);

const sqlQueries = {
  getScheduleInitQ: `SELECT CURRENT_ARTIST AS 'currentArtist', CURRENT_PROMPT AS 'currentPrompt', PROMPT_TYPE AS 'promptType FROM LIVE_SCHEDULE WHERE id = 1;`,
  /* insertTextQ:  `INSERT INTO liveTextPrompts (textPrompt, umin) VALUES (?, ?);
                     INSERT INTO liveTextPromptsBU (textPrompt, umin) VALUES (?, ?);`,
  insertImageQ: `INSERT INTO liveImagePrompts (imagePrompts, umin) VALUES (?, ?);
                     INSERT INTO liveImagePromptsBU (imagePrompts, umin) VALUES (?, ?);` */
}

connection.connect((err) => {
  if(err) { console.log(err.message) }
  console.log('db ' + connection.state );
});

class DbService {

  static getDbServiceInstance() {
    return instance ? instance: new DbService();
  }

  async getScheduleInit() {
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.getScheduleInitQ, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

  async insertNewReflectText(reflectText, reflectTime) {
    let insertData = [reflectText, reflectTime, reflectText, reflectTime];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.insertTextQuery, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

  async insertNewReflectImage(reflectImage, reflectTime) {
    let insertData = [reflectImage, reflectTime, reflectImage, reflectTime];
    try { const response = await new Promise((resolve, reject) => {
            connection.query(sqlQueries.insertImageQuery, insertData, (err, results) => {
              if(err) { reject(new Error(err.message)); }
              else { resolve(results); }
            });
          });
          return response;
    } catch(error) { console.log(error); }
  }

}

module.exports = DbService;