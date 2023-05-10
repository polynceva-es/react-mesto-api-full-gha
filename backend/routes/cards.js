const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');
const { joiIsUrlValid } = require('../utils/isUrlValid');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .required()
      .min(2)
      .max(30),
    link: Joi.string().required().custom(joiIsUrlValid),
  }),
}), postCards);
cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), putCardLike);
cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardLike);

module.exports = cardsRouter;
