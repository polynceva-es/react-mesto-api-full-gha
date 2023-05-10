const usersRouter = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
  getUserInfo,
  celebrateParams,
} = require('../controllers/users');

const {
  name,
  about,
  avatar,
} = celebrateParams;

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserInfo);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserId);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: name.required(), about: about.required(),
  }),
}), updateUserInfo);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({ avatar: avatar.required() }),
}), updateUserAvatar);

module.exports = usersRouter;
