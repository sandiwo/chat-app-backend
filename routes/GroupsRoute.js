var express = require('express');
var router = express.Router();
var GroupsController = require('../controllers/GroupsController');
var multer = require('../libraries/multer')
// var GroupsValidator = require('../validator/GroupsValidator');
// const passport = require('passport');

router.get('/', [
  GroupsController.get
]);

router.post('/', [
  GroupsController.store
]);

router.put('/upload-icon/:id', [
  multer.upload.single('group_icon'),
  GroupsController.uploadIcon
]);

router.put('/:id', [
  GroupsController.update
]);

router.delete('/:id', [
  GroupsController.delete
]);

module.exports = router;