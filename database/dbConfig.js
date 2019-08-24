const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig.development);
