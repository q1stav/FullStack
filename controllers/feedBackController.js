const Feedback = require("../models/Feedback");
const { validationResult } = require("express-validator");

const feedbackSend = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const doc = new Feedback({
      name: req.body.name,
      text: req.body.text,
      rating: req.body.rating,
    });
    const feedback = await doc.save();

    res.json({
      ...feedback._doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка feedback",
    });
  }
};
const feedbackGet=async(req,res)=>{
  const feedbacks=await Feedback.find();
  res.send(feedbacks)
}


module.exports = { feedbackSend,feedbackGet};
