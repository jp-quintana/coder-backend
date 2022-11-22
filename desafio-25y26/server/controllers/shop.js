const User = require('../models/user');
const { generatePassword } = require('../utils/password');

exports.getUser = (req, res, next) => {
  // console.log(req.session.passport.user.username);
  // TODO: VER ESTO NO MAS
  res.json({ email: req.session.passport.user.username });
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
