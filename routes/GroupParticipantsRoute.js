var express = require('express');
var router = express.Router();
var GroupParticipantsController = require('../controllers/GroupParticipantsController');
// var GroupsValidator = require('../validator/GroupsValidator');
// const passport = require('passport');

router.get('/:group/participant', [
  GroupParticipantsController.get
]);

router.post('/:group/participant', [
  GroupParticipantsController.store
]);

module.exports = router;