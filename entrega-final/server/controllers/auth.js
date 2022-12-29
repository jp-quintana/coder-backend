const UserMongoDAO = require('../daos/user/UserMongoDAO');
const { generatePassword } = require('../utils/password');
const { transporter } = require('../utils/mailer');

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

    const isAdmin = user.isAdmin ? true : false;

    res.json({
      email: user.username,
      id: user.id,
      isAdmin,
    });
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

    const contentHTML = `
      <h1>Informacion del usuario</h1>
      <ul>
        <li>
          Nombre de usuario: ${user.username}
        </li>
      </ul>

    `;

    let info = await transporter.sendMail({
      from: '"CODER API" <process.env.EMAIL_ADMIN>', // sender address
      to: process.env.EMAIL_ADMIN, // list of receivers
      subject: 'Registro Nuevo Usuario', // Subject line
      html: contentHTML, // html body
    });

    req.login(user, () => {
      return res.json({ email: newUser.username, id: newUser.id });
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
