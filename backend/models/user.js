const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { isUrlValid } = require('../utils/isUrlValid');

const UnauthorisedError = require('../errors/unauthorisedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: isUrlValid,
    },
    message: 'Ссылка не валидна',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не валидный email', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorisedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorisedError('Неправильные почта или пароль');
          } return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
