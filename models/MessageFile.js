const BaseModel = require('./BaseModel')

class MessageFile extends BaseModel {
  static get tableName() {
    return 'message_files';
  }

  static relationMappings() {
    const Message = require('./Message')

    return {
      message: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Message,
        join: {
          from: 'message_files.message_id',
          to: 'message.id'
        }
      }
    }
  }
}

module.exports = MessageFile