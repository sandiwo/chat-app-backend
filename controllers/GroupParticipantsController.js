const GroupParticipant = require('../models/GroupParticipant')

module.exports = {
  get: async (req, res) => {
    try {
      const groupParticipant = await GroupParticipant.query()
        .where({ group_id: req.params.group })

      res.jsonData(200, "ok", groupParticipant)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  store: async (req, res) => {
    try {
      const groupParticipant = await GroupParticipant.query()
        .insertAndFetch({
          group_id: req.params.group, 
          user_id: req.body.user_id, 
          role: req.body.role,
          created_at: new Date
        }) 

      res.jsonData(200, "ok", groupParticipant)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  delete: async (req, res) => {
    try {
      const groupParticipant = await GroupParticipant.query()
        .where({ group_id: req.params.group })
        .patchAndFetchById(req.params.id, {
          deleted_at: new Date, 
        }) 

      res.jsonData(200, "ok", groupParticipant)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  }
}