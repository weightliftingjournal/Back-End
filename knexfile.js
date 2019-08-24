require('dotenv').config();

const dbConnection = process.env.DATABASE_URL;
//
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/users.db3'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  }
};

//Sqlite configs
// module.exports = {
//   development: {
//     client: 'sqlite3',
//     connection: {
//       filename: './database/users.db3'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './database/migrations'
//     },
//     seeds: {
//       directory: './database/seeds'
//     },
//     useNullAsDefault: true
//   },
//   testing: {
//     client: 'sqlite3',
//     connection: {
//       filename: './database/test.db3'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     useNullAsDefault: true,
//     migrations: {
//       directory: './database/migrations'
//     },
//     seeds: {
//       directory: './database/seeds'
//     },
//     useNullAsDefault: true
//   },
//   production: {
//     client: 'sqlite3',
//     useNullAsDefault: true,
//     connection: process.env.DATABASE_URL,
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       directory: './database/migrations',
//       tableName: 'knex_migrations'
//     },
//     seeds: {
//       directory: './database/seeds'
//     }
//   }
// };
