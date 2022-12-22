require('dotenv').config();

const path = require('path');

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connection } = require('./config/db');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const shopRoutes = require('./routes/shop');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    saveUninitialized: false,
    resave: true,
    secret: 'keySession',
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING,
      mongoOptions: advancedOptions,
    }),
    cookie: {
      maxAge: 1000 * 60 * 10, // => 10 min
      sameSite: 'lax',
      secure: false,
    },
    // 1000 * 60 * 60 * 24 // => 24hs
  })
);

require('./middlewares/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use('/', shopRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

const PORT = process.env.PORT || 8080;

connection()
  .then(() => {
    app.listen(PORT);
    console.log('Listening on port 8080');
  })
  .catch((err) => {
    console.log(err);
  });
