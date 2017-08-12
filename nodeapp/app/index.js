const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const path = require('path');
const ENV = process.env.NODE_ENV || 'production';
const port = process.env.PORT || '8080';
const apiVersion = "v1.0";

app.use(morgan('combined'));
app.use(cors({
    origin: '*'
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
    res.json({
        apiVersion: apiVersion, 
        data: {
            status: '200',
            message: 'Welome to the API in the ' + ENV + ' environment'
        } 
    });   
});

// Base catch error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  delete err.stack; // TODO: Log this when in a dev environment
  res.status(err.statusCode || 500).json({
    apiVersion: apiVersion,
    errors: [{
      status: err.statusCode,
      message: err.message,
    }]
  });
});

app.listen(port, ()=>{
    console.log("API started on port " + port + " in " + ENV + " mode");
});  
process.on('uncaughtException', (err)=>{
    console.error(err.stack);
    console.error('Uncaught exception... continuing')
});

module.exports.app = app;
