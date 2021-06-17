const express = require("express");
const expressLayouts = require ("express-ejs-layouts")
const mongoose = require("mongoose");
const app = express();
require('dotenv').config();
const dbSetup = require('./database/setup')
const port = process.env.PORT || 3000;
const bodyparser = require ("body-parser");
const User = require ("./models/user");
const route = require ("./routes/Route");
const expressSession = require('session',{
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  });
  

const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose")

dbSetup()
mongoose.connect(process.env.DB_URL || 'mongodb+srv://kennedy:v3G6GYhd1sgRl3A6@cluster0.wnseu.mongodb.net/bookapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then (()=> app.listen(port,()=>{
    console.log(`server started on port --->${port}`)
})).catch ((err) => console.log(err))

//EJS
app.set('view engine', 'ejs')

// app.use (express.urlencoded({ extended:true}));

//body parser
app.use (express.urlencoded({ extended:true}));

app.use(express.json());
app.use(route);
app.use(User)
//configure password middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
