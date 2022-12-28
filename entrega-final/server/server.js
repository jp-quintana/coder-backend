require('dotenv').config();

const express = require('express');

const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { connection } = require('./db/mongoConfig');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.json());
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

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Header', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   next();
// });

// app.use((req, res, next) => {
//   req.user = { auth: true };
//   next();
// });

app.use('/api/productos', adminRoutes);
app.use('/api/productos', shopRoutes);
app.use('/api/carrito', cartRoutes);

app.use('*', (req, res, next) => {
  res.status(404).json({ error: -2, descripcion: 'ruta no implementada' });
});

const PORT = process.env.PORT || 8080;

connection()
  .then(() => {
    app.listen(PORT);
    console.log('listening on port 8080');
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(PORT, () => {
//   console.log('listening on port 8080');
// });
