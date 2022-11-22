const express = require('express');
const passport = require('passport');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getUser);

router.post(
  '/login',
  passport.authenticate('local'),
  shopControllers.postLogin
);

router.post('/signup', shopControllers.postSignup);

module.exports = router;
