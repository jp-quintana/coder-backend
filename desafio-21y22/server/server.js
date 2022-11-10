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

const authorEntity = new schema.Entity(
  'authors',
  {},
  {
    idAtribute: 'email',
  }
);

const textEntity = new schema.Entity('text', {
  author: authorEntity,
});

const messageEntity = new schema.Entity('messages', {
  posts: [textEntity],
});

io.on('connection', async (socket) => {
  socket.on('user_connect', async () => {
    const messages = await Message.fetchAll();
    const chat = { id: 1000, posts: [...messages] };

    const payload = normalize(chat, messageEntity);
    socket.emit('load_messages', payload);
  });

  socket.on('send_message', async (data) => {
    console.log('hola');
    const message = new Message(data);
    await message.save();
    const messages = await Message.fetchAll();
    const chat = { id: 1000, posts: [...messages] };

    const payload = normalize(chat, messageEntity);
    io.emit('receive_message', payload);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log('Listening on port ' + port);
});
