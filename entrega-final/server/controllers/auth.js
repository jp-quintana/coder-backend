const UserMongoDAO = require('../daos/user/UserMongoDAO');
const { generatePassword } = require('../utils/password');

const userDb = new UserMongoDAO();

exports.getUser = async (req, res, next) => {
  try {
    if (req.user) {
      res.json({
        email: req.user.username,
        id: req.user.id,
        isAdmin: req.session.isAdmin,
      });
    } else {
      res.json('No user found');
    }
  } catch (err) {
    next(new Error(err));
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userDb.collection.findOne({ username: email });

    res.json({ email: user.username });
  } catch (err) {
    next(new Error(err));
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userDb.collection.findOne({ username: email });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await generatePassword(password);

    const newUser = await userDb.create({
      username: email,
      password: hashedPassword,
    });

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
