/**
  *   Contains database related operations managed by the backend
  *   Author: Lauri Westerholm
  */

const sqlite3 = require('sqlite3');
const path = require('path')
const db_path = path.resolve(__dirname, 'database.db') // path to database file

/**
  *   Establish connection to the database
  *   callback: async callback which must take database connection as argument
  *   return: async callback
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
  *   db: opened database connection
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
  *   query: sqlite3 compatible query
  *   callback: async callback function which must take query output as argument
  *   return: callback with query output
  */
var select = function(query, callback) {
  connect((db) => {
    if (db) {
      db.all(query, [], (err, rows) => {
        if (err) {
          console.error(error.message);
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

module.exports.select = select;
