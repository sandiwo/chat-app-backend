const BaseModel = require('./BaseModel')

class Avatar extends BaseModel {
  static get tableName() {
    return 'avatars';
  }

  static relationMappings() {
    const User = require('./User')

    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'avatars.relation_id',
          to: 'users.id'
        }
      }
    }
  }
}

module.exports = Avatar