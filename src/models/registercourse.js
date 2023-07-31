const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    Name: {
        type:String,
    },
    Email: {
        type:String,
    },
    CourseTitle: {
        type:String,
    },
    Keywords: {
        type:String,
    },
    Prefer: {
        type:String,
    },
    zoom :{
        type:String,
    },
    google_meet:{
        type:String
    },
    others:{
        type:String,
    },
    price:{
        type:Number,
    }
})

//Creating a register
const Register = new mongoose.model("Register", courseSchema);
module.exports= Register;