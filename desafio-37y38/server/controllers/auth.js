const { generatePassword } = require('../utils/password');

const { createUser, fetchUser } = require('../services/auth');

exports.getUser = async (req, res, next) => {
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
};

exports.postLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await fetchUser({ email });

    res.json({
      email: user.username,
      id: user.id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postSignup = async (req, res, next) => {
  const { email, password, name, address, phone, age } = req.body;

  try {
    const existingUser = await fetchUser({ username: email });

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
