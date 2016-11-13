const {eachOfSeries} = require('async');

const {APP_PASSWORDS} = require('./APP_PASSWORDS');
const requestData = require('./requestData');
const saveImages = require('./saveImages');
const photoMetaArr  = require('./instaConfig');

const baseUrl = `https://api.instagram.com/v1/media/search?access_token=`;

eachOfSeries(photoMetaArr, (value, key, outerCallback) => {
  console.log('--------fired:', key);
  const {lat, lng, distance} = value;
  console.log(photoMetaArr[key].lat);
  let dataURL = `${baseUrl}${APP_PASSWORDS.accessToken}&lat=${lat}&lng=${lng}&distance=${distance}`;
   requestData(dataURL, true).then((instaData) => saveImages(instaData, key, outerCallback),(err) => {
     console.log(err);
   });
});
