const BaseModel = require('./BaseModel')

class GroupParticipant extends BaseModel {
  static get tableName() {
    return 'group_participants';
  }

  static relationMappings() {
    const Group = require('./Group')

    return {
      group: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: 'groups.id',
          to: 'group_participants.group_id'
        }
      }
    }
  }
}

module.exports = GroupParticipant