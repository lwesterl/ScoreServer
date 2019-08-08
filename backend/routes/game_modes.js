/**
  *   GameModes related backend api
  *   @author Lauri Westerholm
  */

  const express = require('express');
  const db = require('../db/db');
  const router = express.Router();


  /**
    *   Get all GameModes
    *   @return GameModes in json format
    */
  router.get('/', function(req, res, next) {
    modes_query = 'SELECT * FROM GameModes ORDER BY id ASC;';
    db.select(modes_query, (modes) => {
      res.json(modes);
    });
  });

module.exports = router;
