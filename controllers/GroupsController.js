const Group = require('../models/Group')

module.exports = {
  getByUser: async (req, res) => {
    try {
      const group = await Group.query()

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  get: async (req, res) => {
    try {
      const group = await Group.query()

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  store: async (req, res) => {
    try {
      const group = await Group.query().insertAndFetch({
        name: req.body.name, 
        description: req.body.description, 
        created_by: 1,
        created_at: new Date
      }) 

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  uploadIcon: async (req, res) => {
    try {
      const group = await Group.query().patchAndFetchById(req.params.id, {
        icon_name: req.file.originalname,
        icon_directory: `${req.file.destination}/${req.file.originalname}`
      }) 

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  update: async (req, res) => {
    try {
      const group = await Group.query().patchAndFetchById(req.params.id, {
        name: req.body.name, 
        description: req.body.description, 
      }) 

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  },

  delete: async (req, res) => {
    try {
      const group = await Group.query().patchAndFetchById(req.params.id, {
        deleted_at: new Date, 
      }) 

      res.jsonData(200, "ok", group)
    } catch(err) {
      res.jsonData(500, "error", err)
    }
  }
}