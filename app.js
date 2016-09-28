//var mongoose  = require('mongoose');
var express   = require('express');
var os = require('os');
var fs = require('fs');
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.use(express.static( __dirname + '/public'));

app.get('/', function(req, res){
   // res.send("hey welcome!");
   // res.status(200);
    res.sendFile( __dirname + "/public" + "/home.html");
});


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      first_dog:req.query.first_dog,
      last_dog:req.query.last_dog
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

/* app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_dog:req.body.first_dog,
      last_name:req.body.last_dog
   };
   console.log(response);
   res.end(JSON.stringify(response));
}) */

app.post('/procces_post', function(req, res){
    response = {
      first_dog:req.query.first_dog,
      last_dog:req.query.last_dog
   };
    onsole.log(response);
   res.end(JSON.stringify(response));
})



app.use(function(req, res, next){
    console.log("404");
    res.status(404).send('404 error, file not found');
    
});

/* app.use(function(err, req, res, next){
  if (req.xhr) {
    res.send(500, 'Something went wrong!');
  }
  else {
    next(err);
  }
});  */

console.log('starting the Express (NodeJS) Web server');
var port = process.env.NODE_ENV == 'development' ? 3000 : 80;
app.listen(port);
console.log('Webserver is listening on port '+port);


/*var db;

var config = {
      "USER"    : "",           
      "PASS"    : "",
      "HOST"    : "ec2-xx-xx-xx-xx.ap-southeast-2.compute.amazonaws.com",  
      "PORT"    : "27017", 
      "DATABASE" : "my_example"
    };
	
var dbPath  = "mongodb://"+config.USER + ":"+
    config.PASS + "@"+
    config.HOST + ":"+
    config.PORT + "/"+
    config.DATABASE;
var standardGreeting = 'Hello World!';	

var greetingSchema = mongoose.Schema({
  sentence: String
}); 
var Greeting= mongoose.model('Greeting', greetingSchema);

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function() {
  var greeting;
  Greeting.find( function(err, greetings){
   if( !greetings ){     
      greeting = new Greeting({ sentence: standardGreeting }); 
      greeting.save();
    } 
  }); 
}); 
*/
