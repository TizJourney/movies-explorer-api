const cors = require('cors');

const options = {
  origin: [
    'http://api.tizjourney-films.nomo.nomoredomains.monster',
    'https://api.tizjourney-films.nomo.nomoredomains.monster',
    'http://tizjourney-films.nomoredo.nomoredomains.monster',
    'https://tizjourney-films.nomoredo.nomoredomains.monster',
    'https://github.com/TizJourney',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
};

module.exports = cors(options);
