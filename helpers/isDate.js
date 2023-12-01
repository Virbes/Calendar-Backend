const moment = require('moment/moment');


const isDate = (value, { req, location, path }) => {

    if (!value) return false;

    const date = moment(value);

    return date.isValid() ? true : false;
}



module.exports = { isDate };