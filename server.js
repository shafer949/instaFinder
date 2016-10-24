'use strict';
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser').json();

const route
const APP_PASSWORDS = require('./APP_PASSWORDS').APP_PASSWORDS;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser);
app.get('/getToken', (req, res) => {
  res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${APP_PASSWORDS.clientID}&redirect_uri=${APP_PASSWORDS.redirectUrl}&response_type=token`)
});

app.get('/media/search', (req, res) => {
  request({
    url:`https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=${APP_PASSWORDS.accessToken}`,
    json:true
  }, (err, response, body) => {
    res.send(body);
  })
});

app.listen(PORT, () => {
  console.log('Express app listening on port', PORT);
});
