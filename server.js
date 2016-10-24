const express = require('express');

const APP_PASSWORDS = require('./APP_PASSWORDS');
const PORT = process.env.PORT || 3000;
const app = express();
let authUrl = `https://api.instagram.com/oauth/authorize/?client_id=${APP_PASSWORDS.client_id}&redirect_uri=${APP_PASSWORDS.redirect_uri}&response_type=code`

app.get('/',() => {
  res.redirect(authUrl);
});

app.listen(3000, () => {
  console.log(`Express listening on port: ${PORT}`);
});
