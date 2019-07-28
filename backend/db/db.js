/**
  *   Contains database related operations managed by the backend
  *   @author Lauri Westerholm
  */

const sqlite3 = require('sqlite3');
const path = require('path')
const db_path = path.resolve(__dirname, 'database.db') // path to database file

/**
  *   Establish connection to the database
  *   @param callback async callback which must take database connection as argument
  *   @return: async callback
  */
var connect = function(callback) {
  var db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      return callback(null);
    } else {
      console.log('Database connection established');
      return callback(db);
    }
  });
}

/**
  *   Close opened database connection
  *   @param db opened database connection
  */
var close = function(db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Database connection closed');
    }
  });
}

/**
  *   Execute select all query on the database
  *   @param query sqlite3 compatible query
  *   @param callback async callback function which must take query output as argument
  *   @return callback with query output
  */
var select = function(query, callback) {
  connect((db) => {
    if (db) {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(err.message);
          return callback([]);
        } else {
          close(db);
          //console.log(rows);
          return callback(rows);
        }
      });
    } else {
      return callback([]);
    }
  });
}

/**
  *   Execute command to add entries to database tables
  *   @param command sqlite3 command which adds entries to eiher Score or User table
  *   @param callback async callback to which a status code is returned
  *   @return 200 if succesfull or 403 on error
  */
var add_entries = function(command, callback) {
  connect((db) => {
    db.run(command, (err) => {
      if (err) {
        console.error(err.message);
        callback(403);
      } else {
        console.log('Successfully executed command: ', command);
        callback(200);
      }
      close(db);
    });
  });
}

module.exports.select = select;
module.exports.add_entries = add_entries;
