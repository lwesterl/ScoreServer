const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const scores = [
    {id: 1, time: '21.4.2019 13:39', name: 'Random dude', score: 100},
    {id: 2, time: '12.1.2019 21.43', name: 'True Champion', score: 20004}
  ];
  res.json(scores);
});

module.exports = router;
