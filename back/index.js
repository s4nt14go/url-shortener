require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

console.log('Current folder: ' + __dirname);
const  app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
  if(err){
    console.log('Error connecting to: '+ dbURL)
  }
  else{
    console.log('Connected to: '+ dbURL);
  }
});

routes(app);

const port = process.env.PORT;
const server = app.listen(port, () =>
  console.log(`Your server is running on port ${port}`)
);

module.exports = { server };