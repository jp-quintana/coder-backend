const knex = require('knex');

const configMysql = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'knex-prueba',
  },
};

const configSqlite = {
  client: 'sqlite3',
  connection: {
    filename: './db/messages.sqlite',
  },
};

exports.dbMysql = knex(configMysql);
exports.dbSqlite = knex(configSqlite);
