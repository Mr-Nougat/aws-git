//var mongoose  = require('mongoose');
var express   = require('express');
var os = require('os');
var fs = require('fs');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');

var app = express();
app.use(bodyParser.urlencoded({ extended : false }));
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static( __dirname + '/public'));
app.use(express.static( __dirname + '/uploads'));
app.use(fileUpload());





app.get('/', function(req, res){
   // res.send("hey welcome!");
   // res.status(200);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Ip addres: ' + ip);
    
    
    res.sendFile( __dirname + "/public" + "/home.html");
});


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
    response = { 
        first_dog:req.query.first_dog,
        last_dog:req.query.last_dog
    };
    var date = getDateTime();
    var info = JSON.stringify(response);
    console.log(info + ' Date: ' + date);
    res.end(info);
})

app.post('/process_post', function(req, res) {
    response = { 
        first_dog:req.query.first_dog,
        last_dog:req.query.last_dog
    };
    console.log(response);
    res.end('got information');
}); 

/*app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_dog:req.body.first_dog,
      last_dog:req.body.last_dog
   };
   console.log(response);
   res.end(JSON.stringify(response));
}) 

app.post('/process_post', function(req, res) {
    console.log('got post req');
    response = {
      first_dog:req.body.first_dog,
      last_dog:req.body.last_dog
   };
   console.log(response);
   res.end(JSON.stringify(response));
}); 

app.all('/process_post', function (req, res) {
      res.send("Message received.");
      res.end();
}) 
*/

app.post('/upload', function(req, res) {
    var sampleFile;
 
    if (!req.files || req.files.sampleFile.name == '') {
        res.send('No files were uploaded.');
        return;
    } 
    
    
    sampleFile = req.files.sampleFile;
    var name =  sampleFile.name;
    console.log('uploaded file: ' + name);
    
    sampleFile.mv( __dirname + '/uploads/' + name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});

// downlaod file:
/* app.get('/upload', function(req, res){
   // res.send("downloading file right now!");
    res.download( __dirname + "/base" + "/BASE.EXE"); 
}); */ 



app.use(function(req, res, next){
    console.log("404");
    res.status(404).send('404 error, file not found');
    
});

function getDateTime() {

    var date = new Date();

    var hour = date.getHours() +3; // ISR time 
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

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
