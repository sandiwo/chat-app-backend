var Avatar = require('../models/Avatar')

module.exports = {
  upload: async (req, res) => {
    try{
      await Avatar.query().insert({
        name: req.file.originalname,
        relation_id: req.params.relation == 'group' ? req.body.group_id : req.auth().id,
        relation: req.params.relation,
        directory: `${req.file.destination}/${req.file.originalname}`,
        uploaded_at: new Date
      })
      res.send(req.file)
    } catch(err) {
      res.send(err.message)
    }
  },

  lastUploaded: async (req, res) => {
    await Avatar.query().findOne({
        relation: req.params.relation,
        relation_id: req.params.relation == 'group' ? req.body.group_id : req.auth().id,
        deleted_at: null
      })
      .orderBy('uploaded_at', 'DESC')
      .then(response => {
        res.jsonData(200, "success", response)
      })
      .catch(error => {
        res.jsonError(404, "error", error.message)
      })
  },

  delete: async (req, res) => {
    await Avatar.query().where({
        id: req.params.id,
        relation: req.params.relation,
        relation_id: req.params.relation == 'group' ? req.body.group_id : req.auth().id,
      }).update({
        deleted_at: new Date
      })
      .then(response => {
        res.jsonData(200, "success", response)
      })
      .catch(error => {
        res.jsonError(404, "error", error.message)
      })
  }
}