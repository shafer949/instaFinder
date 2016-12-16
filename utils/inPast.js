const moment = require('moment');
/*
supports:
if a TIMEFRAME env var is specified, moment will use that,
useful in cases where the user wants to get more photos in the past
(keep in mind that Instagram only allows for the last 20 photos to be retrieved--no pagination)
*/
const timeFrame = process.env.TIMEFRAME || "days";
let isWithinPast = (pastAmt,timeItemCreated) => {
  const pastDay = moment().subtract(pastAmt,timeFrame).unix();
  return pastDay < timeItemCreated;
}

module.exports = isWithinPast;
