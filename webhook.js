var io = require('socket.io-client');
var fs = require('fs');
var Client = require('node-rest-client').Client;

const express = require('express')
const https = require('https');
const port = 443;
const host = '10.16.76.148';
const https_options = {
  key: fs.readFileSync('../cert/key.pem'),
  cert: fs.readFileSync('../cert/cert.pem')
};

const app = express()
var router = express.Router();
var myParser = require("body-parser");


// Use JSON parser for incoming and outgoing responses with Google assistant
app.use(myParser.json());
app.use(myParser.urlencoded({extended: true}));
server = https.createServer(https_options, app).listen(port, host);
console.log('HTTPS Server listening on %s:%s', host, port);

// Webhook
app.post('/webhook', function (req,res) {
  console.log('Received a post request');
  if (!req.body)
    return res.sendStatus(400)
  res.setHeader('Content-Type', 'application/json');
  console.log('here is post request from Dialogflow');
  console.log(req.body);
  var getAction = req.body.queryResult.parameters.Action
  switch (getAction.toLowerCase()) {
    case 'make call':
      var caller = req.body.queryResult.parameters.phone-number[0];
      var callee = req.body.queryResult.parameters.phone-number[1];
      console.log('make call with AES api');
    case 'drop call':
      var caller = req.body.queryResult.parameters.phone-number[0];
      console.log('drop call with AES api');

  let resObj= {
                  "fufillmentText": " "
                  ,"fulfillmentMessages": [{'text':{'text':['waiting ' + getAction]}}]
                  ,"source" : "UcClients Testing VA"
  };
  console.log('here is a respone to dial log flow');
  console.log(resObj);
  return resObj
}});

// API
app.get('/makeCall', function (req,res){
  res.send('ABC');
  console.log('Make call with AES');
  console.log('Get Call Session from EAS');
});

// API drop call
app.get('/dropCall', function (req,res){
  console.log('Drop call with AES');
});
