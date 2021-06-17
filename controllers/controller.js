const User = require ("../models/user");
const { findOneAndDelete } = require('../models/user');
const passport = require ("passport");

exports.registerUser = function (req, res){
    const {username, password, password2 } = req.body;
    

    //fetch user details from req body
    //check if user with username already exists
    User.findOne({ username:username }), (err, existingUser) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ err })
        }
        if (existingUser) {
            return res.status(400).json({ message: 'a user with this username already exists !' })
        }
        //create new user
        else {
            User.create(new User({username: username}), password, password2, function(err, user){
                if (err){
                    console.log(err)
                }
                
             //checking required fiels
                if (!username || !password || !password2){
                    return res.status(400).json({message:"check required fields"})
                }

            //check if password  match
            if (password1 !== password2){
                return res.status({msg:"passwords mismatch!"})
            }
            if (password.length < 5){
                return res.status({message:"choose a stronger password"})
            }
                User.save((err, savedUser) => {
                    if (err) {
                        return res.status(500).json({ err })
                    }
                    })
                
                    .then(()=>{
                        res.redirect("/login");
                    
                    }).catch((err)=>{
                    console.log(err);
                })
                
            })
        }
    }
}
    exports.loginUser= function(req, res){
        passport.authenticate("local", {
            successRedirect: "/secret",
            failureRedirect: "/login"
        })
    }

    exports.logoutUser= function(req, res){
        req.logout();
        res.redirect("/");
    }
    exports.isLoggedIn= function(req, res, next){
        if (req.isAuthenticated()) return next();
        res.redirect("/login")


    }
