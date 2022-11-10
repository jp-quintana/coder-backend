const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { normalize, schema } = require('normalizr');

const indexRoutes = require('./routes/index');
const Message = require('./models/message');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

app.use('/api/productos-test', indexRoutes);

const authorEntity = new schema.Entity('authors');

const contentEntity = new schema.Entity('content', {
  author: authorEntity,
});

const messageEntity = new schema.Entity('messages', {
  author: authorEntity,
  post: [contentEntity],
});

io.on('connection', async (socket) => {
  socket.on('user_connect', async () => {
    const messages = await Message.fetchAll();
    const chat = { id: 1000, post: messages };
    const payload = await normalize(chat, messageEntity);
    socket.emit('load_messages', payload);
  });

  socket.on('send_message', async (data) => {
    console.log('hola');
    const message = new Message(data);
    await message.save();
    const payload = await Message.fetchAll();
    io.emit('receive_message', payload);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log('Listening on port ' + port);
});
