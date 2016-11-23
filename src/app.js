const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Síða fannst ekki.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    status: err.status,
  });
});

module.exports = app;
