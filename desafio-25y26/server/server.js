const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { dbConnect } = require('./db/mongoConfig');

const shopRoutes = require('./routes/shop');

const app = express();

const PORT = 8080;

app.use('/', shopRoutes);

dbConnect()
  .then(() => {
    app.listen(PORT);
    console.log('Listening on port 8080');
  })
  .catch((err) => {
    console.log(err);
  });
