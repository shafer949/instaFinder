//const async = require('async');
const fs = require('fs');
const request = require('request');
const {eachOfSeries} = require('async');
const config = require('./instaConfig');

let isWithinPast = require('./inPast');
let pastAmt = process.env.pastAmt || 1;


let saveImages = function(instaData,index,outerCallback) {
  //individual photos are located at: instaData[i].images.standard_resolution
  let photoArr = [];
  instaData.forEach((val) => {
    if(val.type === 'image') {
      if(isWithinPast(parseInt(pastAmt,10),parseInt(val.created_time,10))) {
        photoArr.push({
          user:val.user.username,
          image:val.images.low_resolution.url,
          likes: val.likes.count,
          hashtags: val.tags,
          place: val.location.name,
          description: val.caption ? val.caption.text : "no description"
        });
      }
    }
  });
  //call async
  eachOfSeries(photoArr,function(value, key, innerCallback) {
    //request the data from each photoArr
    //save that to the fs
    var imagePlace = config[index].description.trim().replace(/ /gi, "");
    request(value.image).pipe(fs.createWriteStream(`downloads/${imagePlace}_${key}.jpg`));
    fs.appendFile('downloads/data.txt',`Item ${key} in ${config[index].description}:
    description:${value.description}
    by user: ${value.user}
    location: ${value.place}
    hashtags used: ${value.hashtags}
    total likes: ${value.likes}

    `,(err)=> {
      if(err) {
        console.log(`Couldn't add item ${key}`);
      }
    });
    innerCallback();
  },() => {
    console.log('all done');
    outerCallback();
  });
  return photoArr;
}

module.exports = saveImages;
