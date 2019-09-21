/**
  *   @file levels.js
  *   Levels related backend api
  *   @author Lauri Westerholm
  */

  const express = require('express');
  const db = require('../db/db');
  const router = express.Router();


  /**
    *   Get all levels
    *   @return levels in json format
    */
  router.get('/', function(req, res, next) {
    level_query = 'SELECT name FROM Levels ORDER BY sortKey ASC;';
    db.select(level_query, (levels) => {
      res.json(levels);
    });
  });

module.exports = router;
