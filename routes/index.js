var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.body);
	console.log(req.cookies);
  res.render('index', {isLoggedIn:true, title: 'Express',username:"xiang",password:"551247",languages: ['php', 'node', 'ruby'], products:{DOB:"1991-4-27","age":25,weight:76} });
});

router.post("/", function(req,res,next){
	console.log(req.body);
	console.log(req.user);
	res.json("hi");
});



module.exports = router;

console.log("from index.js");