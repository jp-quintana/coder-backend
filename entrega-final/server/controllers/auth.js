const { generatePassword } = require('../utils/password');

const { createUser, fetchUser } = require('../services/auth');

exports.getUser = async (req, res, next) => {
  try {
    if (req.user) {
      res.json({
        email: req.user.username,
        id: req.user.id,
        name: req.user.name,
        age: req.user.age,
        address: req.user.address,
        phone: req.user.phone,
        isAdmin: req.session.isAdmin,
      });
    } else {
      res.json('No user found');
    }
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await fetchUser({ email });

    console.log('ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRRRRRRR');

    res.json({
      email: user.username,
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
    next(new Error(error));
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password, name, address, phone, age } = req.body;
    const existingUser = await fetchUser({ email });

    if (existingUser) {
      throw new Error('El usuario ya existe');
    }

    const hashedPassword = await generatePassword(password);

    const newUser = await createUser({
      username: email,
      password: hashedPassword,
      name,
      address,
      phone,
      age,
    });

    req.login(newUser, () => {
      return res.json({ email: newUser.username, id: newUser.id });
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};
