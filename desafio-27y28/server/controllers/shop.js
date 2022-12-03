const path = require('path');
const { fork } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));

const User = require('../models/user');
const { generatePassword } = require('../utils/password');

exports.getUser = (req, res, next) => {
  if (req.user) {
    res.json({ email: req.user.username });
  } else {
    res.json('No user found');
  }
};

exports.getInfo = (req, res, next) => {
  // if (req.user) {
  //   res.json({ email: req.user.username });
  // } else {
  //   res.json('No user found');
  // }

  res.json({
    arguments: argv._,
    platform: process.platform,
    node_version: process.version,
    memory: process.memoryUsage(),
    path: path.dirname(__filename),
    id: process.pid,
    directory: process.cwd(),
  });
};

exports.getRandom = (req, res, next) => {
  console.log('working');
  const number = req.query.cant;
  const childProcess = fork('childProcesses/random.js', [number]);
  childProcess.send(number);
  childProcess.on('message', (result) => {
    res.json({ number, result });
  });
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ username: email });

    res.json({ email: user.username });
  } catch (err) {
    next(new Error(err));
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ username: email });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await generatePassword(password);

    const newUser = new User({
      username: email,
      password: hashedPassword,
    });

    await newUser.save();

    const user = {
      id: newUser.id,
      username: newUser.username,
    };

    req.login(user, () => {
      return res.json({ email: newUser.username });
    });
  } catch (err) {
    console.log(err);
    next(new Error('El usuario ya existe'));
  }
};

exports.deleteSession = async (req, res, next) => {
  try {
    // req.logut(function () {});
    req.session.destroy(function (err) {
      if (!err) {
        res
          .status(200)
          .clearCookie('connect.sid', { path: '/' })
          .json({ status: 'Success' });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
