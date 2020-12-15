const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  /*Start from models => controllers=>routes and
  after completeing all those import the model here */
  Task = require('./api/models/sampleModel'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
const config = require('./util');
const username = encodeURIComponent(config.mongousername);
const password = encodeURIComponent(config.mongopassword);
const clusterUrl = config.mongoclusterurl;
const dbname = encodeURIComponent(config.dbname);

const authMechanism = "DEFAULT";

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`,{dbName: dbname, useNewUrlParser: true ,useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send("<h1>Welcome</h1>")
})//default route showing generic welcome @ayan do not move this to routes

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

require("./api/routes/")(app);

app.listen(port);
console.log('Dailycious Dabba RESTful API server started on: ' + port);

