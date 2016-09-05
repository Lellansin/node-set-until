'use strict';

var parser = require('cron-parser');

module.exports = function (fn, time) {
  if (typeof fn == 'function')
    return setTimeout(fn, getDelay(time));
  return new Promise(function (resolve) {
    setTimeout(resolve, getDelay(fn));
  });
};

function getDelay (time) {
  if (typeof time == 'number')
    return time;
  let end = getEnd(time);
  let now = Date.now();
  if (end > now)
    return end - now;
  return 0;
}

function getEnd (time) {
  switch (typeof time) {
    case 'object':
      if (time instanceof Date)
        return time.getTime();
      return Date.now();
    case 'string':
      return parser.parseExpression(time).next().getTime();
    default:
      return Date.now();
  }
}
