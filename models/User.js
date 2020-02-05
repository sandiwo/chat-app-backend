const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'username', 'password', 'active'],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 64 },
        email: { type: 'string', minLength: 1, maxLength: 64 },
        username: { type: 'string', minLength: 1, maxLength: 64 },
        password: { type: 'string', minLength: 1, maxLength: 64 },
        active: { minLength: 1, maxLength: 1 },
      }
    }
  }

  static relationMappings() {
    const Message = require('./Message')
    const Avatar = require('./Avatar')
    return {
      message: {
        relation: BaseModel.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.sender_id'
        }
      },
      avatar: {
        relation: BaseModel.HasOneRelation,
        modelClass: Avatar,
        join: {
          from: 'users.id',
          to: 'user_avatars.user_id'
        }
      }
    }
  }

  static get validPassword() {
    console.log('valid password');
  }
}

module.exports = User