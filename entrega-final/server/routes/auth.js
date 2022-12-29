const express = require('express');
const passport = require('passport');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.get('/user', authControllers.getUser);

router.post(
  '/login',
  passport.authenticate('local'),
  authControllers.postLogin
);

router.post('/signup', authControllers.postSignup);

router.delete('/session', authControllers.deleteSession);

module.exports = router;
