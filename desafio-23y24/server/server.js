const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
  session({
    secret: 'mongoKey',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: '',
      mongoOptions: advancedOptions,
    }),
    cookie: { maxAge: 10 * 60 * 1000, sameSite: 'lax', secure: false },
  })
);

app.get('/session', (req, res, next) => {
  res.json(req.session.name);
});

app.post('/session', async (req, res, next) => {
  try {
    console.log('Working');
    const { name } = req.body;
    req.session.name = name;
    res.json(req.session.name);

    console.log(req.session.id);
  } catch (err) {
    console.log(err);
  }
});

const PORT = '8080';

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
