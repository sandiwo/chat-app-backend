var express = require('express');
var router = express.Router();
const passport = require('passport');
var multer = require('../libraries/multer')
var AvatarsController = require('../controllers/AvatarsController')

router.post('/upload', 
  [
    passport.authenticate('jwt', {session: false}),
    multer.upload.single('avatar'), 
    AvatarsController.upload
  ]
);

router.get('/last-uploaded', [
  passport.authenticate('jwt', {session: false}),
  AvatarsController.lastUploaded
])

router.delete('/delete/:id', [
  passport.authenticate('jwt', {session: false}),
  AvatarsController.delete
])

module.exports = router;