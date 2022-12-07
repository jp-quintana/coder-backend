require('dotenv').config();

const minimist = require('minimist');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connection } = require('./config/db');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const cluster = require('cluster');
const os = require('os');
const argv = require('minimist')(process.argv.slice(2));

const shopRoutes = require('./routes/shop');
const { info } = require('console');

const app = express();

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

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ error: error.message });
});

// INICIAR CON FOREVER => forever start server.js "portNumber"
const PORT = process.argv[2] || 8080;

// INICIAR EN MODO FORK => npm run fork
// INICIAR EN MODO CLUSTER => npm run cluster
if (argv.modo === 'cluster') {
  const numProcessors = os.cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < numProcessors; i++) {
      cluster.fork();
    }
  } else {
    app.use('/', shopRoutes);

    connection()
      .then(() => {
        app.listen(PORT);
        console.log('Listening on port ' + PORT + ' - ' + process.pid);
      })
      .catch((err) => {
        console.log(err);
      });
  }
} else {
  app.use('/', shopRoutes);

  connection()
    .then(() => {
      app.listen(PORT);
      console.log('Listening on port ' + PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}
