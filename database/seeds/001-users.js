const bcrypt = require('bcryptjs'); // Import for encryption

exports.seed = function(knex, Promise) {
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        {
          username: 'admin',
          password: bcrypt.hashSync('password', 10),
          firstName: 'admin',
          lastName: 'admin',
          email: 'admin@gmail.com'
        },
        {
          username: 'sammy',
          password: bcrypt.hashSync('password', 10),
          firstName: 'Sammy',
          lastName: 'Stewart',
          email: 'sammy@gmail.com'
        },
        {
          username: 'billy',
          password: bcrypt.hashSync('password', 10),
          firstName: 'Billy',
          lastName: 'Brown',
          email: 'billy@gmail.com'
        },
        {
          username: 'tina',
          password: bcrypt.hashSync('password', 10),
          firstName: 'tina',
          lastName: 'timothy',
          email: 'tina@gmail.com'
        }
      ]);
    });
};
