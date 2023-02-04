const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserMongoDAO = require('../daos/user/UserMongoDAO');
const { validatePassword } = require('../utils/password');

const userDb = new UserMongoDAO();

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await userDb.collection.findOne({ username: username });

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

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await userDb.collection.findById(userId);
    done(null, user);
  } catch (err) {
    console.log(err);
  }
});
