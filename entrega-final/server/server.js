const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use((req, res, next) => {
  req.user = { auth: true };
  next();
});

app.use('/api/productos', adminRoutes);
app.use('/api/productos', shopRoutes);
app.use('/api/carrito', cartRoutes);

app.use('*', (req, res, next) => {
  res.status(404).json({ error: -2, descripcion: 'ruta no implementada' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('listening on port 8080');
});
