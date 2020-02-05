const BaseModel = require('./BaseModel')

class Avatar extends BaseModel {
  static get tableName() {
    return 'user_avatars';
  }

  static relationMappings() {
    const User = require('./User')

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_avatars.user_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Avatar