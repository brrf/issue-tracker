/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;

const CONNECTION_STRING = process.env.DATABASE;

// MongoClient.connect(CONNECTION_STRING, function(err, db) {
//   if (err) {
//     console.log('error with database connection')
//   } else {
//     console.log(`connected to mongo database, ${db}`)
//   }
// });

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      res.send('hello there!')
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
