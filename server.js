// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));
app.use('/public', express.static(process.cwd() + '/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// ############ MY PROJECT CODE #####

app.get('/api/timestamp/:date_string?', function (req, res) {
  const paramDate = req.params.date_string; // get :date_string from route
  const dateNow = new Date(); // now date for undefined param
  //console.log(isNaN(paramDate)) // 2015-12-25 true, 1450137600 false

  if (paramDate == undefined) {
    res.json({ "unix": dateNow.getTime(), "utc": dateNow.toUTCString() })
  } else if (isNaN(paramDate) && new Date(paramDate).toString() != "Invalid Date") { // 2015-12-25
    res.json({ "unix": new Date(paramDate).getTime(), "utc": new Date(paramDate).toUTCString() })
  } else if (!isNaN(paramDate) && new Date(paramDate * 1000).toString() != "Invalid Date") { // 1450137600
    res.json({ "unix": paramDate, "utc": new Date(paramDate * 1000).toUTCString() })
  } else {
    res.json({ "error": "Invalid Date" })
  }
}) 
