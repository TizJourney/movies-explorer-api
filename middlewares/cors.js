const cors = require('cors');

const options = {
  origin: [
    'http://api.tizjourney-mesto.nomoredomains.club',
    'https://api.tizjourney-mesto.nomoredomains.club',
    'http://tizjourney-mesto.nomoredomains.club',
    'https://tizjourney-mesto.nomoredomains.club',
    'https://github.com/TizJourney',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
};

module.exports = cors(options);
