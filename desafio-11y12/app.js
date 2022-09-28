const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const Product = require('./models/product');

const expressHbs = require('express-handlebars');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const { emit } = require('process');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);

io.on('connection', (socket) => {
  // Products
  socket.on('userConnect', async () => {
    const products = await Product.getAll();
    socket.emit('populateProducts', products);
  });

  socket.on('addProduct', async (productToAdd) => {
    console.log('working', productToAdd);
    const product = new Product(productToAdd);
    await product.save();
    const products = await Product.getAll();
    io.emit('populateProducts', products);
  });
  // Messages
});

const PORT = 8080 || process.env.PORT;

server.listen(PORT, () => {
  console.log('listening on *:8080');
});
