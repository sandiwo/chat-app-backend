const Message = require('../models/Message')

module.exports = {
  getByReceiver: (req, res) => {
    Message.query()
      .where({
        receiver_id: req.params.id
      })
      .then(data => {
        res.jsonData(200, "Success.", data)
      })
      .catch(err => {
        res.jsonData(500, "Server error.", err.message)
      })
  },

  getBySenderAndReceiver: (req, res) => {
    Message.query()
      .withGraphFetched('files')
      .where({
        receiver_id: req.params.receiver,
        sender_id: req.params.sender
      })
      .orWhere({
        receiver_id: req.params.sender,
        sender_id: req.params.receiver
      })
      .then(data => {
        res.jsonData(200, "Success.", data)
      })
      .catch(err => {
        res.jsonData(500, "Server error.", err.message)
      })
  },

  store: async (req, res) => {
    await Message.query()
      .insert({
        sender_id: req.auth().id,
        message: req.body.message,
        receiver_id: req.body.receiver_id,
        type: req.body.type,
        created_at: req.body.created_at,
        send_at: new Date
      })
      .then(created => {
        res.jsonData(200, "OK", created)
      })
      .catch(err => {
        res.jsonData(500, "Database error, cannot send message.", err.message)
      })
  },

  storeWithFile: async (req, res) => {
    await Message.query()
      .insertGraphAndFetch({
        sender_id: req.auth().id,
        message: req.body.message,
        receiver_id: req.body.receiver_id,
        type: req.body.type,
        created_at: req.body.created_at,
        send_at: new Date, 

        files: [
          {
            name: req.file.originalname,
            directory: `${req.file.destination}/${req.file.originalname}`,
            caption: req.body.caption,
            uploaded_at: new Date
          }
        ]
      })
      .then(created => {
        res.jsonData(200, "OK", created)
      })
      .catch(err => {
        res.jsonData(500, "Database error, cannot send message.", err.message)
      })
  }
}