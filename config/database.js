const Knex = require('knex');

const database = {
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: 'root',
      password: null,
      database: process.env.DB_DATABASE
    }
  }
}

module.exports = database;