/**
  *   @file scores.js
  *   Score related backend api
  *   @author Lauri Westerholm
  */

const express = require('express');
const db = require('../db/db');
const router = express.Router();
const isNumeric = require('isnumeric');
const isInteger = require('is-integer');
const jsStringEscape = require('js-string-escape');


/**
  *   Get all scores
  *   @return scores in json format
  */
router.get('/', function(req, res, next) {
  var scores_query = 'SELECT * FROM Scores;';
  db.select(scores_query, (scores) => {
    res.json(scores);
  });
});

/**
  *   Get req.amount of Scores sorted by score
  *   @return sorted scores in json format
  */
router.get('/top_scores', function(req, res, next) {
  if (isNumeric(req.query.limit)) {
    var scores_query = `SELECT Scores.id as id, score, level, time, name FROM Scores JOIN Users ON Users.id = userID ORDER BY score DESC LIMIT ${req.query.limit};`;
    db.select(scores_query, (scores) => {
      res.json(scores);
    });
  } else {
    res.sendStatus(403);
  }
});

/**
  *   Get all Scores but return only score itself, level and gameMode
  *   @return each score and level of Score entries as json
  */
router.get('/scores_and_levels', function(req, res, next) {
    var scores_query = 'SELECT score, level, gameMode FROM Scores;';
    db.select(scores_query, (scores) => {
      res.json(scores);
    });
});


/**
  *   Get all scores for specific user
  *   Note: provide user name and level name as req parameters: /specific_scores?name=some_name&level=some_level
  *   Pass 'get_all_levels' as level_name to return all user specific scores
  *   @return scores in json format ordered by time, older first
  */
router.get('/specific_scores', function(req, res, next) {
    var user_name = jsStringEscape(req.query.name);
    var level_name = jsStringEscape(req.query.level);
    console.log(user_name, level_name)
    var scores_query = `SELECT * FROM Scores WHERE level="${level_name}" AND userID IN (SELECT id FROM Users WHERE name="${user_name}") ORDER BY time ASC;`
    if (level_name === 'get_all_levels') {
      scores_query = `SELECT * FROM Scores WHERE userID IN (SELECT id FROM Users WHERE name="${user_name}") ORDER BY time ASC;`
    }
    db.select(scores_query, (scores) => {
      res.json(scores);
    });
});

/**
  *   Add one new Score instance to the database
  *   @param req body should contain a new Score as json
  *   @return 200 on success, 403 on failure, see console log
  *   Note: id which is used as primary key for Score is automatically choosen
  *   For testing: curl -X POST -H 'Content-Type:application/json' -d '{ "score": 300, "time": "01-01-2019 21:00", "completed": 1, "level": "Level 3", "userID": 1, "gameMode" : 0 }' http://localhost:5000/api/scores/add_score
  */
router.post('/add_score', function(req, res, next) {
  var new_score = req.body;
  if (('score' in new_score) && ('time' in new_score) &&
  ('completed' in new_score) && ('level' in new_score) &&
  ('userID' in new_score) && ('gameMode' in new_score)) {
    if ((isNumeric(new_score.score)) && (new_score.completed === 1 || new_score.completed === 0)
    && (isInteger(new_score.userID)) && (isInteger(new_score.gameMode))) {
      const id_query = 'SELECT MAX(id) as id FROM Scores;';

      db.select(id_query, (id) => {
        if (Object.keys(id).length === 0) {
          res.sendStatus(304);
        } else {
          var new_id = id[0].id + 1; // this should be unique
          const insert = `INSERT INTO Scores VALUES(${new_id}, ${new_score.score}, "${jsStringEscape(new_score.time.trim())}", ${new_score.completed}, "${jsStringEscape(new_score.level.trim())}", ${new_score.userID}, ${new_score.gameMode});`;
          db.add_entries(insert, (result) => {
            res.sendStatus(result);
          });
        }
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
