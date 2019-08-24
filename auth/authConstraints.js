const Users = require('../users/users-model.js');

module.exports = authConstraints;

async function authConstraints(req, res, next) {
  const { username, password, firstName, lastName, email } = req.body;
  if (!username || !password || !firstName || !lastName || !email) {
    return res.status(406).json({
      error: true,
      user: {},
      message: 'Include required credentials and try again.'
    });
  }

  const usernameCheck = await checkForUsername(username);
  const emailCheck = await checkForEmail(email);
  if (usernameCheck && emailCheck) {
    res.status(409).json({
      error: true,
      usernameError: true,
      emailError: true,
      message: 'Username and email already exist.'
    });
  } else if (usernameCheck) {
    res.status(409).json({
      error: true,
      usernameError: true,
      emailError: false,
      message: 'Username already exists.'
    });
  } else if (emailCheck) {
    res.status(409).json({
      error: true,
      usernameError: false,
      emailError: true,
      message: 'Email already exists.'
    });
  } else {
    next();
  }
}

async function checkForUsername(username) {
  const foundUsername = await Users.find().where({ username });
  return foundUsername.length ? true : false;
}

async function checkForEmail(email) {
  const foundEmail = await Users.find().where({ email });
  return foundEmail.length ? true : false;
}
