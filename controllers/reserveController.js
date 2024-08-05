const Reserve = require("../models/Reserve");
const { validationResult} = require("express-validator");

const reserveSend = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new Reserve({
      name: req.body.name,
      phone: req.body.phone,
      guests: req.body.guests,
      booking:req.body.booking,
      date: req.body.date,
    });

    const reserve = await doc.save();

    res.json({
      ...reserve._doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка reserve",
    });
  }
};

const reserveGet=async(req,res)=>{
    const reserves=await Reserve.find();
    res.send(reserves);
}

module.exports={reserveSend,reserveGet}
