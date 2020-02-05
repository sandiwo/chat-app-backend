var Avatar = require('../models/Avatar')

module.exports = {
  lastUploaded: async (req, res) => {
    await Avatar.query().where({user_id: req.auth().id, deleted_at: null}).orderBy('uploaded_at', 'DESC')
      .then(response => {
        res.jsonData(200, "success", response[0])
      })
      .catch(error => {
        res.jsonError(404, "error", error.message)
      })
  },
  delete: async (req, res) => {
    await Avatar.query().where({
        id: req.params.id,
        user_id: req.auth().id,
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