const BaseModel = require('./BaseModel')

class Group extends BaseModel {
  static get tableName() {
    return 'groups';
  }

  static relationMappings() {
    const Avatar = require('./Avatar')
    const GroupParticipant = require('./GroupParticipant')

    return {
      avatar: {
        relation: BaseModel.HasOneRelation,
        modelClass: Avatar,
        join: {
          from: 'groups.id',
          to: 'avatars.relation_id'
        }
      },
      groupParticipant: {
        relation: BaseModel.HasManyRelation,
        modelClass: GroupParticipant,
        join: {
          from: 'group_participants.group_id',
          to: 'groups.id'
        }
      }
    }
  }
}

module.exports = Group