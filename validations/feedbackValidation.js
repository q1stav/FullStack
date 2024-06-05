const { body } = require("express-validator");

const feedbackValidation = [
  body("name", 'Введите имя').isLength({ min: 2, max: 20 }),
  body("text",'Отзыв не более 400 символов').isLength({ min: 5, max: 400 }),
  body("rating").isInt(),
];

module.exports = { feedbackValidation };
