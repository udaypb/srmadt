var express=require('express');
var body_parser=require('body-parser');
var app=express();
var jwt=require('jsonwebtoken');

var Student=require('./models/db');
var mongoose=require('mongoose');



mongoose.connect('localhost:27017/new');					//database name is myapp

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection:error'));
//var a=db.once('open',Student.addSchema);



app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));

app.set('view engine','jade');					//to view jade files --->those are nothing bt html templates!

//------------------------------routing and helper functions!!!!!!!!!!!!!!!!1-------------------------------//

app.get('/',function(req,res){
	res.send("this is working!!!!!!");
});

app.get('/login',function(req,res){

	res.render('newuser',{title:'add new!'});
});

app.post('/adduser',function(req,res){

	var username=req.body.username;
	var pass=req.body.password;
	var email=req.body.email;
	var n=new Student({

		username: username,
		password: pass,
		email : email
	});

	n.save(function(err){
		if(err) throw err;

		console.log('user saved!!!!!!!');
		res.redirect("userlist");

	});

});			//adduser method over
//-------------------------------------------------------------------------------------------------------------
app.listen(4000);
console.log("connect success");