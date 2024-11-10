var path = require('path');
const sqlite3 = require('sqlite3').verbose();

function createDBConnection() {
  const db = new sqlite3.Database(path.resolve(__dirname + '/starred.db'), (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log('Connection with SQLite has been established');
  return db;
}

module.exports = createDBConnection();
