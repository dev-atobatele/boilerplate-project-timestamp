// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  console.log(req.params)
  let {date} = req.params;
  let unix = new Date(date).valueOf();
  let utc = new Date(date).toUTCString();
  if(!date){
    unix = new Date().valueOf();
    utc = new Date().toUTCString();
  }
  let regex = /\d{5}/g;
  if (regex.test(date)) {
    unix = new Date(parseInt(date)).valueOf();
    utc = new Date(parseInt(date)).toUTCString();
  }
  let obj = {
    unix:unix,
    utc: utc
  }
  if(utc == 'Invalid Date'){obj = {error:utc}}
  console.log(obj);
  res.json(obj);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
