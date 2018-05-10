const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json')

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));




app.listen(8000 , () => {
  console.log("server Started On 8000");
})


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Cucurigu12',
  database : 'manelesite'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});



app.post('/signUp',(req,res) => {
	let user = {};
	user.firstname = req.body.firstname
	user.lastname = req.body.lastname
	user.email = req.body.email
	user.pass = req.body.password
	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
	connection.query(`insert into users(firstname,lastname,email,pass) values('${user.firstname}','${user.lastname}','${user.email}','${user.pass}')`,function(err,rows,fields){
    if(!err){
      console.log(rows.length);
      if (rows.length!=0){
        res.json({ok:true});  
      }
      if (rows.length == 0){
        res.json({ok:false});
      }
    }
    if (err) {
      console.log(err);
    }

  })
})



app.post('/login',(req,res) => {
  let user = {};
	user.email = req.body.email
	user.password = req.body.password
	console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
	connection.query(`select * from users where email = '${user.email}' and pass = '${user.password}'`,function(err,rows,fields){
    if(!err){
      console.log(rows.length);
      if (rows.length!=0){
        res.json({ok:true}); 
        console.log('a mers'); 
      }
      if (rows.length == 0){
        res.json({ok:false});
      }
    }
    if (err) {
      console.log(err);
    }

  })
})