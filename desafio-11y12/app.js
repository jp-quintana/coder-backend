const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const Product = require('./models/product');

const expressHbs = require('express-handlebars');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

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
  // Messages
});

const PORT = 8080 || process.env.PORT;

server.listen(PORT, () => {
  console.log('listening on *:8080');
});
