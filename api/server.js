const express = require('express');
const server = express();
require('dotenv').config();

const cors = require('cors');
const helmet = require('helmet');

const restricted = require('../auth/restricted.js');

const exercisesRouter = require('../exercises/exercisesRouter.js');
const journalRouter = require('../journals/journalsRouter.js');
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/restricted/exercises', restricted, exercisesRouter);
server.use('/api/restricted/journals', restricted, journalRouter);
server.use('/api/restricted/users', restricted, usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'we are up and running' });
});

module.exports = server;

//
