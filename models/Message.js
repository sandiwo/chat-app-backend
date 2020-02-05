const BaseModel = require('./BaseModel')

class Message extends BaseModel {
  static get tableName() {
    return 'messages';
  }

  static relationMappings() {
    const User = require('./User')

    return {
      sender: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.sender_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Message