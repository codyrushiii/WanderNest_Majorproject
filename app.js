if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
//console.log(process.env.SECRET);

//Require the installed packages
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOveride=require("method-override");
const ejsMate=require("ejs-mate");
const session= require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

//Not neccessary already included
const wrapAsync=require("./utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require('./schema.js');
const ExpressError=require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



//Require views & set-up
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOveride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//Require the 'Listing' model in app.js
const Listing=require("./models/listing.js");

//Require the 'Review' model in app.js
const Review=require("./models/review.js");


//Create a connection between MongoDB & Nodejs
const dbUrl = process.env.DB_URL;

async function main() {
    await mongoose.connect(dbUrl);
}  

main().then(()=>{
    console.log('connected to DB')
}).catch((err)=>{
    console.log(err);
});


//Start the Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
;

//Define the Session Options
const sessionOptions={
    secret: process.env.SESSION_SECRET,

    resave:false,
    saveUnintialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
};
 
// Create First Route: Home ('/')
// app.get('/',(req,res)=>{
//     res.send('Hi, I am Root User');                   
// });

//Use Express-Session
app.use(session(sessionOptions));

//Use Connect-Flash
app.use(flash());

//Use Passport (A middleware that initializes passport)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware (flash)
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
   // console.log(res.locals.success);
    next();
});

app.use('/listings',listingRouter);
app.use('/listings/:id/reviews',reviewRouter);
app.use('/',userRouter);


//Test of all routes
app.all('*',(req,res,next)=>{
    next(new ExpressError(401,'page not found'));
});


//Middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message}=err;
    res.status(statusCode).render('error.ejs',{message});
});
 
 //Testing route for Listing
// app.get('/testListing', async(req,res)=>{
//     let sampleListing= new Listing({
//     title:'My New Vila',
//     description:'By the Beach',
//     price:1200,
//     location:'Calangate,Goa',
//     country:'India',
// });
// await sampleListing.save();
// console.log('sample was saved');
// res.send('successfull testing');
// });

// app.get('/demouser', async(req,res)=>{
//     let fakeUser = new User({
//         email:'student@gmail.com',
//         username:'delta-student'
//     });
//     let registeredUser = await User.register(fakeUser,'helloworld');
//     console.log(registeredUser);
//     res.send(registeredUser);
// });


