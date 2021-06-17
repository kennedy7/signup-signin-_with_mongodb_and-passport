const express = require ("express");
const router = express.Router();
const { registerUser, loginUser, isLoggedIn ,logoutUser } = require ("../controllers/controller")

//showing home page
router.get("/", function ( req, res) {
    res.render("home")
});

// showing secret page
router.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret")})

//REGISTRATION FORM
router.get ("/register", (req, res) => {
    return res.render ("register");
});
router.post ("/register", registerUser, (err, res)=>{
    if (err){
        console.log (err)
        return res.status(500).json({ err })
    }
    else{
        res.render("login")
    }
})


//LOGIN
router.get("/login",  (req, res) => {
    return res.render ("login");
   
});
router.post("/login", loginUser, function (req, res){
passport.authenticate("local")(
    req, res, function(){res.render("secret")
    console.log (res)}
)
});


//logout
router.get("/logout",  (req, res) => {
    return res.render ("logout");
});

module.exports = router;
