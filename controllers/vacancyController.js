const Vacancy = require("../models/Vacancy");
const { validationResult } = require("express-validator");


const vacancySend = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
  
      const doc = new Vacancy({
        name: req.body.name,
        phone: req.body.phone,
        position: req.body.position,
        date: req.body.date,
      });
      const vacancy = await doc.save();
  
      res.json({
        ...vacancy._doc,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Ошибка vacancy",
      });
    }
  };

  const vacancyGet=async(req,res)=>{
    const vacancies=await Vacancy.find();
    res.send(vacancies)
  }


  module.exports={vacancySend,vacancyGet}