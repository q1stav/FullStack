const {body} = require("express-validator");

const loginValidation=[
    body('email').isEmail(),
    body('password'),
]

module.exports = {loginValidation};