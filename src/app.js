const express = require("express");
require("./db/conn");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


//setting static path
const staticpath = path.join(__dirname,"../Public");

const { json } = require("express");

//Middleware
app.use('/css', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath))

const Register = require("./models/registercourse");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Setting view engines
var engines=require('consolidate');
app.set("view engine","hbs");


//Routing (routing for teacher's homepage)
app.get("/",(req,res)=>{
    res.render("index")
})

//rendering registercourse on URL call 
app.get("/register_course",(req,res)=>{
    res.render("register_course") 
})

//Uploading to mongodb
app.post("/register", async (req,res)=>{
    try{
        const newCourse = new Register ({
            Name: req.body.Name,
            Email: req.body.Email,
            CourseTitle: req.body.CourseTitle,
            Keywords: req.body.Keywords,
            Prefer: req.body.Prefer,
            zoom: req.body.zoom,
            google_meet: req.body.google_meet,
            others: req.body.others,
            price: req.body.price,
        })
        const registered = await newCourse.save();
        res.status(201).render("index");
    } catch (error){
        res.status(400).send(error);
    }
})


app.get("/Student_requests",(req,res)=>{
    res.render("Student_requests") 
})

//fetching data from courses register 
app.get('/courses', (req,res)=> {
    Register.find({},function(err,mycourses){
        res.render('courses',{
            my_courses: mycourses
        })
    })
})

app.get('/aboutus',(req,res)=>{
    res.render("aboutus")
})

//Create server
app.listen(port, ()=> {
    console.log(`server is running at port number: ${port}`);
})