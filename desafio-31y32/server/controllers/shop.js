const path = require('path');
const cluster = require('cluster');
const os = require('os');
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

exports.getInfo = async (req, res, next) => {
  // PRUEBA FUNCIONAMIENTO CLUSTER
  // const calculateRandom = (number) => {
  //   const result = {};

  //   for (let i = 1; i <= number; i++) {
  //     const randomNumber = Math.floor(Math.random() * (number - 1 + 1) + 1);
  //     if (result[randomNumber]) {
  //       result[randomNumber] = result[randomNumber] + 1;
  //     } else {
  //       result[randomNumber] = 1;
  //     }
  //   }

  //   return result;
  // };

  // await calculateRandom(10000000);

  res.json({
    arguments: argv._,
    platform: process.platform,
    node_version: process.version,
    memory: process.memoryUsage(),
    path: path.dirname(__filename),
    id: process.pid,
    directory: process.cwd(),
    numProcessors: os.cpus().length,
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
