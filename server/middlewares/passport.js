const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { validatePassword } = require('../utils/password');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return done(null, false);
    }

    const isValid = await validatePassword(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

// const verifyCallback = async (username, password, done) => {
//   User.findOne({ username: username })
//     .then((user) => {
//       if (!user) {
//         return done(null, false);
//       }

//       return validatePassword(password, user.password)
//         .then((isValid) => {
//           if (isValid) {
//             return done(null, user);
//           } else {
//             return done(null, false);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    console.log(err);
  }
});
