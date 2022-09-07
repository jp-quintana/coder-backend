const express = require('express');

const adminRoutes = require('./routes/admin');

const app = express();

app.use(adminRoutes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});
