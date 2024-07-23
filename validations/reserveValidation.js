const {body}=require("express-validator");

const reserveValidation=[
    body("name",'Введите имя').isLength({min:2, max:20}),
    body("phone",'Введите номер телефона'),
    body("guests",'Укажите количество гостей'),
    body("booking",'Укажите дату бронирорвания'),
];

module.exports={reserveValidation};