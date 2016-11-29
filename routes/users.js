var express = require('express');
var router = express.Router();
var passport=require("passport");

/* GET users listing. */
router.get("/profile",isLoggedIn,function(req,res,next){
	res.render("users/profile");
});


//sing up
router.get("/signup", function(req,res){
  var messages=req.flash("signupMessage");
	res.render("users/signup",{hasErrors:messages.length>0,messages:messages});
});

router.post("/signup", passport.authenticate("local-signup",{
	 successRedirect : '/users/profile', // redirect to the secure profile section
     failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
}));


//sign in
router.get("/signin", function(req,res){
  var messages=req.flash("loginMessage")
	res.render("users/signin",{hasErrors:messages.length>0,messages:messages});
});

router.post("/signin",passport.authenticate("local-signin",{
	successRedirect : '/users/profile', // redirect to the secure profile section
    failureRedirect : '/users/signin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


//log out
router.get("/logout",function(){
  req.logout();
  res.redirect("/");
});


module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}













console.log("2  from routes/user.js");