const { body } = require("express-validator");

const feedbackValidation = [
  body("text").isLength({ min: 5, max: 200 }),
  body("rating").isInt(),
];

module.exports = { feedbackValidation };
