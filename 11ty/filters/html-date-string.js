const { DateTime } = require("luxon");

// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
function htmlDateString(date) {
  return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat('yyyy-LL-dd');
}

module.exports = htmlDateString;
