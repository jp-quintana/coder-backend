const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', adminRoutes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
