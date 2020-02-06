var express = require('express');
var router = express.Router();
const passport = require('passport');
var multer = require('../libraries/multer')
var Avatar = require('../models/Avatar')
var AvatarsController = require('../controllers/AvatarsController')

router.post('/upload', 
  [
    passport.authenticate('jwt', {session: false}),
    multer.upload.single('avatar'), async (req, res, next) => {
      try{
        await Avatar.query().insert({
          name: req.file.originalname,
          user_id: req.auth().id,
          directory: `${req.file.destination}/${req.file.originalname}`,
          uploaded_at: new Date
        })
        res.send(req.file)
      } catch(err) {
        res.send(err.message)
      }
    }
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