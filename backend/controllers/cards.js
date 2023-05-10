const mongoose = require('mongoose');
const http2 = require('node:http2');
const Card = require('../models/card');

const { HTTP_STATUS_CREATED } = http2.constants;
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => { next(err); });
};

module.exports.postCards = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      card.populate('owner')
        .then((resultCard) => res.status(HTTP_STATUS_CREATED).send(resultCard))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const userId = req.user._id;
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      } else if (card.owner.valueOf() === userId) {
        card.deleteOne()
          .then(res.send({ message: 'Пост удалён' }))
          .catch((err) => next(err));
      } else {
        throw new ForbiddenError('Вы не являетесь владельцем карточки');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Передан некорректный id:${cardId}`));
      } else { next(err); }
    });
};

module.exports.putCardLike = (req, res, next) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: user } }, { new: true })
    .then((card) => {
      if (card) {
        card.populate(['owner', 'likes'])
          .then((resultCard) => res.send(resultCard))
          .catch((err) => next(err));
      } else {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Передан некорректный id:${cardId}`));
      } else { next(err); }
    });
};

module.exports.deleteCardLike = (req, res, next) => {
  const user = req.user._id;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: user } }, { new: true })
    .then((card) => {
      if (card) {
        card.populate(['owner', 'likes'])
          .then((resultCard) => res.send(resultCard))
          .catch((err) => next(err));
      } else {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Передан некорректный id:${cardId}`));
      } else { next(err); }
    });
};
