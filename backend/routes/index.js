/**
  *   @file index.js
  *   Index route
  *   @author Lauri Westerholm
  */

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ScoreServer API' });
});

module.exports = router;
