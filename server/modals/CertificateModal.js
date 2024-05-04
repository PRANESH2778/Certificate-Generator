const mongoose = require("mongoose")
const certificateSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    courseName:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    link:{
        type:String,
        required:true,
    },
    certificateId:{
        type:String,
        required:true,
    }
},{timestamps:true}
)
module.exports = mongoose.model("Certificate",certificateSchema)