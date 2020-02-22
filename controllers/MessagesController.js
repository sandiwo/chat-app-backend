const Message = require('../models/Message')
const MessageRepository = require('../repositories/MessageRepository')

module.exports = {
  getByGroup: async (req, res) => {
    try {
      const message = await MessageRepository.getByGroup(req.params.group);

      res.jsonData(200, "Success.", message)
    } catch(err) {
      res.jsonData(500, "Server error.", err.message)
    }
  },

  getBySenderAndReceiver: async (req, res) => {
    try {
      const message = await MessageRepository.getBySenderAndReceiver(
        req.params.sender,
        req.params.receiver
      ) 

      res.jsonData(200, "Success.", message)
    } catch (error) {
      res.jsonData(500, "Server error.", error.message)
    }
  },

  store: async (req, res) => {
    try {
      const message = await MessageRepository.store(req)
      res.jsonData(200, "OK", message)
    } catch (error) {
      res.jsonData(500, "Database error, cannot send message.", error.message)
    }
  },

  storeWithFile: async (req, res) => {
    try {
      const messageWithFile = await MessageRepository.storeWithFile(req)
      res.jsonData(200, "OK", messageWithFile)
    } catch (error) {
      res.jsonData(500, "Database error, cannot send message.", error.message)
    }
  },

  update: async (req, res) => {
    try {
      const message = await MessageRepository.update(req.params.id, req)
      res.jsonData(200, "OK", message)
    } catch (error) {
      res.jsonData(500, "Database error, cannot update a message.", error.message)
    }
  },

  destroy: async (req, res) => {
    try {
      const message = await MessageRepository.delete(req.params.id, req)
      res.jsonData(200, "OK", message)
    } catch (error) {
      res.jsonData(500, "Database error, cannot delete a message.", error.message)
    }
  }
}