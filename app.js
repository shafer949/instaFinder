const {eachOfSeries} = require('async');

const {APP_PASSWORDS} = require('./APP_PASSWORDS'); //remove from .gitignore for interview process
const requestData = require('./utils/requestData');
const saveImages = require('./utils/saveImages');
const photoMetaArr  = require('./utils/instaConfig');

const baseUrl = `https://api.instagram.com/v1/media/search?access_token=`;

/*
Foreach location I specified in instaConfig.js, give me all of the photos in that location
(Instagram api only allows a location to give the last 20 photos), then go through each photo
and save it to the fs with relevant data in a .txt file (in downloads folder), once that location is
complete, move on to the next one.
*/
eachOfSeries(photoMetaArr, (value, key, outerCallback) => {
  console.log('--------fired:', key);
  const {lat, lng, distance} = value;
  console.log(photoMetaArr[key].lat);
  let dataURL = `${baseUrl}${APP_PASSWORDS.accessToken}&lat=${lat}&lng=${lng}&distance=${distance}`;
   requestData(dataURL, true).then((instaData) => {
     var indivLocPhotos = saveImages(instaData, key, outerCallback);
   },(err) => {
     console.log(err);
   });
}, () => {
  return
});
