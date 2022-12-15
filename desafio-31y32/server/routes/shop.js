const express = require('express');
const passport = require('passport');
const compression = require('compression');

const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/user', shopControllers.getUser);

router.get('/info', compression(), shopControllers.getInfo);

router.get('/random?', shopControllers.getRandom);

router.post(
  '/login',
  passport.authenticate('local'),
  shopControllers.postLogin
);

router.post('/signup', shopControllers.postSignup);

router.delete('/session', shopControllers.deleteSession);

module.exports = router;
