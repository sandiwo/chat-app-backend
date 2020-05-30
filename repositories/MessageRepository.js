const Message = require('../models/Message')

class MessageRepository {

  static async getByGroup(id) {
    return await Message.query()
    .where({
      relation: 'group',
      relation_id: id
    }) 
  }

  static async getBySenderAndReceiver(sender_id, receiver_id) {
    return await Message.query()
      .withGraphFetched('files')
      .where('relation', 'user')
      .orWhere({
        receiver_id,
        sender_id,
        relation: 'user'
      })
      .orderBy('created_at')
  }

  static async store(req) {
    return await Message.query()
      .insert({
        sender_id: req.auth().id,
        message: req.body.message,
        receiver_id: req.body.receiver_id,
        type: req.body.type,
        relation: req.body.relation,
        relation_id: req.body.relation_id || req.auth().id,
        created_at: req.body.created_at,
        send_at: new Date
      })
  }

  static async storeWithFile(req) {
    const message = await this.store(req)
    const files = await Message.relatedQuery('files')
      .for(message.id)
      .insert({
        name: req.file.originalname,
        directory: `${req.file.destination}/${req.file.originalname}`,
        caption: req.body.caption,
        uploaded_at: new Date
      })

    return Object.assign(message, { files })
  }

  static async update(id, req) {
    return await Message.query()
      .updateAndFetchById(id, {
        message: req.body.message,
        updated_at: new Date
      })
  }

  static async delete(id, req) {
    return await Message.query()
      .updateAndFetchById(id, {
        deleted_at: new Date
      })
  }
}

module.exports = MessageRepository