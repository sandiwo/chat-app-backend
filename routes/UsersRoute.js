var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController');
var UsersValidator = require('../validator/UsersValidator');
const passport = require('passport');

router.get('/', [
  passport.authenticate('jwt', {session: false}),
  UsersController.get
]);

router.get('/profile-from-token', [
  passport.authenticate('jwt', {session: false}),
  UsersController.profileFromToken
]);

router.get('/:id', [
  passport.authenticate('jwt', {session: false}),
  UsersController.find
]);

router.post('/', [
  // passport.authenticate('jwt', {session: false}),
  UsersValidator.store,
  UsersController.store
]);

router.put('/:id', [
  passport.authenticate('jwt', {session: false}),
  UsersValidator.update,
  UsersController.update
]);

router.put('/toggle-active/:id', [
  passport.authenticate('jwt', {session: false}),
  UsersController.toggleActivate
]);

router.delete('/:id', [
  passport.authenticate('jwt', {session: false}),
  UsersController.delete
]);

module.exports = router;