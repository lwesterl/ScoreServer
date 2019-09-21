/**
  *   @file users.js
  *   Users related backend api
  *   @author Lauri Westerholm
  */

const express = require('express');
const db = require('../db/db');
const router = express.Router();
const isNumeric = require('isnumeric');
const jsStringEscape = require('js-string-escape');


/**
  *   Get all users
  *   @return all users as json
  */
router.get('/', function(req, res, next) {
  const users_query = 'SELECT * FROM Users;';
  db.select(users_query, (users) => {
    res.json(users);
  });
});

/**
  *   Get specific user with name as search key
  *   @return user as json or empty object if not found
  */
router.get('/user/:name', function(req, res, next) {
  var name = jsStringEscape(req.params.name);
   const query = `SELECT * from Users WHERE name="${name}";`;
  db.select(query, (user) => {
    res.json(user);
  });
});

/**
  *   Add new user to the database
  *   @param req body should contain a name for the new User as json
  *   @return 200 on success, otherwise 403
  *   Note: id which is used as primary key is automatically choosen
  *   For testing: curl -X POST -H 'Content-Type:application/json' -d '{ "name": "New user" }' http://localhost:5000/api/users/add_user
  */
router.post('/add_user', function(req, res, next) {
  var new_user = req.body;
  console.log(new_user);
  if ('name' in new_user) {
    name = jsStringEscape(new_user.name);
    const id_query = 'SELECT MAX(id) as id FROM Users;';

    db.select(id_query, (id) => {
      if (Object.keys(id).length === 0) {
        res.sendStatus(304);
      } else {
        var new_id = id[0].id + 1; // this should be unique to be used as primary key
        const insert = `INSERT INTO Users VALUES(${new_id}, "${name}");`;
        db.add_entries(insert, (result) => {
          console.log(result);
          res.status(result).send(`${new_id}`);
          // if 403 is returned here, unique constrant on name has probably failed
        });
      }
    });

  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
