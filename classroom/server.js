const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
//const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path=require("path");
const wrapAsync=require("../utils/wrapAsync.js");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

//app.use(cookieParser("secretcode"));
let sessionOptions= {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));
app.use(flash());

app.get('/register',(req,res)=>{
    let {name = 'anonymous'} = req.query;
    req.session.name= name;
    console.log(req.session);
    //res.send(name);
    console.log(name);
    req.flash("success","user registered successfully!!");
    res.redirect('/hello');

});
app.get('/hello',(req,res)=>{
    console.log(req.flash("success"));
    res.locals.messages= req.flash("success");
    res.render("page.ejs",{name:req.session.name });
});

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
});


// app.get('/reqcount',(req,res)=>{
//     if(!req.session.count){
//     req.session.count = 1;
//     }
//     else{
//         req.session.count++;
//     }
//     res.send(`You visited the page ${req.session.count} times`);
// });
// app.get('/test',(req,res)=>{
//     res.send('test successful');
// });

// app.use('/users',users);
// app.use('/posts',posts)

// app.get('/getcookies',(req,res)=>{
//     res.cookie("Country","India", {signed:true});
//     res.cookie("Greet","Namaste" ,{signed:true});
//     res.send('Sent you a cookie?');
//     console.log(req.signedCookies);
// });

// app.get('/greet',(req,res)=>{
//     console.log(req.cookies);
//     res.cookie("name","Rushi");
//     let {name,Country} = req.cookies;
//     res.send(`Hello ${Country}`);
// });

// app.get('/getsignedcookie',(req,res)=>{
//     res.cookie("city","mumbai",{signed:true});
//     res.send("sent");
//     console.log(req.signedCookies);

// });
