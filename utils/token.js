const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.tokenKey = NODE_ENV === 'production' ? JWT_SECRET : 'development-key';
