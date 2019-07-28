/**
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
  scores_query = 'SELECT * FROM Scores';
  db.select(scores_query, (scores) => {
    res.json(scores);
  });
});

/**
  *   Add one new Score instance to the database
  *   @param req body should contain a new Score as json
  *   @return 200 on success, 403 on failure, see console log
  *   For testing: curl -X POST -H 'Content-Typetion/json' -d '{ "id": 6, "score": 300, "time": "01-01-2019 21:00", "completed": 1, "level": "Level 3", "userID": 1 }' http://localhost:5000/api/scores/add_score
  */
router.post('/add_score', function(req, res, next) {
  var new_score = req.body;
  //var new_score = { id: 5, score: 300, time: '01-01-2019 21:00', completed: 1, level: 'Level 3', userID: 1 };
  if (('id' in new_score) && ('score' in new_score) && ('time' in new_score) &&
  ('completed' in new_score) && ('level' in new_score) && ('userID' in new_score)) {
    if ((isNumeric(new_score.score)) && (isInteger(new_score.id)) &&
    (new_score.completed === 1 || new_score.completed === 0) && (isInteger(new_score.userID))) {
      const insert = `INSERT INTO Scores VALUES(${new_score.id}, ${new_score.score}, "${jsStringEscape(new_score.time.trim())}", ${new_score.completed}, "${jsStringEscape(new_score.level.trim())}", ${new_score.userID});`;
      db.add_entries(insert, (result) => {
        res.sendStatus(result);
      });
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
