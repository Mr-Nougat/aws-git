//var mongoose  = require('mongoose');
var express   = require('express');
var os = require('os');
var fs = require('fs');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static( __dirname + '/public'));
app.use(express.static( __dirname + '/uploads'));
app.use(fileUpload());



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

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_dog:req.body.first_dog,
      last_dog:req.body.last_dog
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


app.post('/upload', function(req, res) {
    var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.sampleFile;
    sampleFile.mv( __dirname + '/uploads/' + sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});

app.get('/upload', function(req, res){
   // res.send("downloading file right now!");
    res.download( __dirname + "/base" + "/BASE.EXE"); 
});



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
