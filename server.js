// server.js
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
let datetime = new Date()
app.get("/api", (req,res)=>{
  let unix = datetime.getTime();
  
  res.json({"unix": parseInt(unix), "utc": datetime.toUTCString() })
}
)
let output ={}
app.get("/api/:date", (req, res) =>{
  let dateinput = req.params.date;
  if (Date.parse(dateinput)){
    output['unix'] = new Date(dateinput).getTime();
    output['utc'] = new Date(dateinput).toUTCString();

  }
  else{
    let input = parseInt(dateinput)
    output['unix'] = input;
    output['utc'] = new Date(input).toUTCString();
  }
  if(!output['unix'] || !output['utc']){
    res.json({ error : "Invalid Date" })
  }
  res.json(output)
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
