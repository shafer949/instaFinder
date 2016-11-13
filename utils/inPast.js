const moment = require('moment');
/*
supports:

*/
const timeFrame = process.env.TIMEFRAME || "days";
let isWithinPast = (pastAmt,timeItemCreated) => {
  const pastDay = moment().subtract(pastAmt,timeFrame).unix();
  return pastDay < timeItemCreated;
}

module.exports = isWithinPast;
