const path = require('path');

const express = require('express');
const expressHbs = require('express-handlebars');

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const app = express();

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

app.listen(8081, () => {
  console.log('listening on port 8080');
});
