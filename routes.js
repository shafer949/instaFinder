'use strict';
const express = require('express');
const request = require('request');
const fs = require('fs');
const APP_PASSWORDS = require('./APP_PASSWORDS').APP_PASSWORDS;
let router = express.Router();
let lat = '41.553353';
let lng = '-90.5729315';
let distance = '3000';

router.get('/getToken', (req, res) => {
  res.redirect(`https://api.instagram.com/oauth/authorize/?client_id=${APP_PASSWORDS.clientID}&redirect_uri=${APP_PASSWORDS.redirectUrl}&response_type=token`);
});

router.get('/media/search/qc', (req, res) => {
  const baseUrl = `https://api.instagram.com/v1/media/search?lat=48.858844&lng=2.294351&access_token=`;
  let imageLinks = [];
  console.log("in the search route");
    request({
      url:`${baseUrl}${APP_PASSWORDS.accessToken}&lat=${lat}&lng=${lng}&distance=${distance}`,
      }, (err, response, body) => {
        if(!err) {
          console.log('Number of items',body.data.length);
          let imagesData = body.data;
          let image = imagesData[0].images.standard_resolution.url;
          console.log(image);
        }else {
          console.log(err);
        }
    });
});

module.exports.router = router;
