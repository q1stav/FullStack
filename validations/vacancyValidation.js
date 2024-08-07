const { body } = require("express-validator");

const vacancyValidation = [
  body("name", 'Введите имя').isLength({ min: 2, max: 20 }),
  body("phone",'Введите телефон'),
  body("position", "Введите должность не более 20 символов").isLength({ min: 2, max: 20 }),
];

module.exports = { vacancyValidation };
