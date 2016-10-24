'use strict';
const express = require('express');
const request = require('request');

const routes = require('./routes').router;

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/insta', routes);

app.listen(PORT, () => {
  console.log('Express app listening on port', PORT);
});
