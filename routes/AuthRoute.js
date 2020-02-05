var express = require('express');
var router = express.Router();
var AuthValidator = require('../validator/AuthValidator');
var AuthController = require('../controllers/AuthController');

router.post('/login', [
    AuthValidator.login,
    AuthController.login
  ]
);

module.exports = router;