var express = require('express');
var router = express.Router();
var passport=require("passport");

//to delete
var User=require("../models/user.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/",function(req,res,net){
	var user=new User({
  	email:req.body.email,
  	password:req.body.password
  });
  user.save(function(err,result){
  	console.log("stored to db");
  });
  res.json("done!");
});

router.get("/profile",isLoggedIn,function(req,res,next){
	res.render("users/profile");
});

router.get("/signup", function(req,res){
  var messages=req.flash("signupMessage");
	res.render("users/signup",{hasErrors:messages.length>0,messages:messages});
});

router.post("/signup", passport.authenticate("local-signup",{
	 successRedirect : '/users/profile', // redirect to the secure profile section
     failureRedirect : '/users/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
}));

router.get("/signin", function(req,res){
  var messages=req.flash("loginMessage")
  console.log(messages);
	res.render("users/signin",{hasErrors:messages.length>0,messages:messages});
});

router.post("/signin",passport.authenticate("local-signin",{
	successRedirect : '/users/profile', // redirect to the secure profile section
    failureRedirect : '/users/signin', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;

function isLoggedIn(req, res, next) {  
  if (req.isAuthenticated())
      return next();
  res.redirect('/');
}

