const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', function(req, res, next) {
  scores_query = 'SELECT * FROM Scores';
  db.select(scores_query, (scores) => {
    res.json(scores);
  });
});

module.exports = router;
