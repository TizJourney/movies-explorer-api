const { NODE_ENV, DATABASE_ADRESS } = process.env;

module.exports.databaseAdress = NODE_ENV === 'production' ? DATABASE_ADRESS : 'mongodb://localhost:27017/filmsdb';
