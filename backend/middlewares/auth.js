require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const UnauthorisedError = require('../errors/unauthorisedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.`);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются'
      );
      }
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
