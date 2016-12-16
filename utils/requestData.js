const request = require('request');

let requestData = (dataURL, isJson) => {
  return new Promise((resolve, reject) => {
    request({
      url:dataURL,
      json:isJson
      }, (err, response, body) => {
      if(!err && isJson) {
        //if json, body is an object that has meta:statusCode and data:content
        let data = body.data;
        resolve(data);
      }
      else if (!err) {
        resolve(body);
      }else {
        reject('Could not complete', err.message);
      }
    });
  });
}

module.exports = requestData;
