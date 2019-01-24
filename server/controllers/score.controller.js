var config = require('config.json');
var express = require('express');
var router = express.Router();
var scoreService = require('services/score.service');

// routes
router.put('/', update);
router.get('/', getAll);



function update(req, res) {

  console.log("controller")
  scoreService.update(req.body)

}

function getAll(req, res) {
  console.log("Getall - Server - Controller ");
  scoreService.getAll()

}

module.exports = router;
