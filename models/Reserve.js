const mongoose = require("mongoose");

const ReserveSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    guests:{
        type:Number,
        require:true,
    },
    booking:{
        type:String,
        require:true,
    },
    date:{
        type:String,
        require:true,
    }
});

const Reserve=mongoose.model("Reserve", ReserveSchema);

module.exports=Reserve;
