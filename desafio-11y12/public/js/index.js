const socketClient = io();

const form = document.getElementById('form');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const thumbnailInput = document.getElementById('thumbnail');

const table = document.getElementById('table');

socketClient.emit('userConnect');

socketClient.on('populateProducts', (products) => {
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

socketClient.on('message', (message) => {});
