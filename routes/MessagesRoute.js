const express = require('express')
const router = express.Router()
const MessagesController = require('../controllers/MessagesController')
const passport = require('passport')
const multer = require('../libraries/multer')

router.get('/group/:group', [
  passport.authenticate('jwt', {session: false}),
  MessagesController.getByGroup
])

router.get('/:sender/:receiver', [
  passport.authenticate('jwt', {session: false}),
  MessagesController.getBySenderAndReceiver
])

router.post('/', [
  passport.authenticate('jwt', {session: false}),
  MessagesController.store
])

router.post('/file', [
  passport.authenticate('jwt', {session: false}),
  multer.upload.single('message_file'),
  MessagesController.storeWithFile
])

router.patch('/:id', [
  passport.authenticate('jwt', {session: false}),
  MessagesController.update
])

router.delete('/:id', [
  passport.authenticate('jwt', {session: false}),
  MessagesController.destroy
])

module.exports = router