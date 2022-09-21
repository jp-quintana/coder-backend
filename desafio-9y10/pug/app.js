const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
