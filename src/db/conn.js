const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Courses_db",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> {
    console.log("Courses_db connection successful");
}).catch((error) => {
    console.log(error);
})