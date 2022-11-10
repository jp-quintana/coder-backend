const socketClient = io();

// Product form
const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const thumbnailInput = document.getElementById('thumbnail');

// Table
const table = document.getElementById('table');
const noProducts = document.getElementById('noProducts');

// Chat
const chatForm = document.getElementById('chatForm');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

socketClient.emit('userConnect');

socketClient.on('populateProducts', (products) => {
  table.style.display = 'table';
  noProducts.style.display = 'none';

  if (products.length === 0) {
    noProducts.style.display = 'block';
    table.style.display = 'none';
    return;
  }

  table.innerHTML = `<tr>
  <th>Titulo</th>
  <th>Precio</th>
  <th>Thumbnail URL</th>
</tr>`;

  products.forEach((product) => {
    const row = table.insertRow();
    const titleCell = row.insertCell();
    titleCell.innerHTML = product.title;
    const priceCell = row.insertCell();
    priceCell.innerHTML = product.price;
    const thumbnailCell = row.insertCell();
    thumbnailCell.innerHTML = product.thumbnail;
  });
});

socketClient.on('populateMessages', (messages) => {
  messages.forEach((message) => {
    const { user, body, time, date } = message;
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="text">${user} - ${date} ${time} : ${body}</p>`;
    chatMessages.appendChild(div);
  });
});

form.onsubmit = (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const price = priceInput.value;
  const thumbnail = thumbnailInput.value;

  const productToAdd = {
    title,
    price,
    thumbnail,
  };

  socketClient.emit('addProduct', productToAdd);

  e.target.reset();
};

socketClient.on('message', ({ user, body, time, date }) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="text">${user} - ${date} ${time} : ${body}</p>`;
  chatMessages.appendChild(div);
});

chatForm.onsubmit = (e) => {
  e.preventDefault();

  console.log('runnnin');
  const user = emailInput.value;
  const body = messageInput.value;
  const time = new Date().toLocaleTimeString();
  const date = new Date().toLocaleDateString();

  const payload = { user, body, time, date };

  socketClient.emit('messageSent', payload);

  messageInput.value = '';
};
