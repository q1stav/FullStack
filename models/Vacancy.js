const mongoose = require("mongoose");

const VacancySchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    position:{
        type:String,
        require:true,
    },
    date: {
        type:String,
        require:true,
    }
});

const Vacancy=mongoose.model("Vacancy",VacancySchema);

module.exports=Vacancy;