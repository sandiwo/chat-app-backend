const BaseModel = require('./BaseModel')

class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static relationMappings() {
    const User = require('./User')
    const MessageFile = require('./MessageFile')

    return {
      sender: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.sender_id',
          to: 'users.id'
        }
      },
      files: {
        relation: BaseModel.HasOneRelation,
        modelClass: MessageFile,
        join: {
          from: 'messages.id',
          to: 'message_files.message_id'
        }
      }
    }
  }
}

module.exports = Message