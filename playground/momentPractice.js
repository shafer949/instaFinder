const moment = require('moment');
const yesterday = moment().subtract(1,'days').unix();

console.log(yesterday);
