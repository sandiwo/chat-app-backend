const BaseModel = require('./BaseModel')

class Group extends BaseModel {
  static get tableName() {
    return 'groups';
  }

  static relationMappings() {
    const GroupParticipant = require('./GroupParticipant')

    return {
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