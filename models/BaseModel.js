const { Model } = require('objection');
const Knex = require('knex');
const databaseConfig = require('../config/database');

const knex = Knex(databaseConfig.production);
Model.knex(knex);

class BaseModel extends Model {}

module.exports = BaseModel