/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const Issues = require('../schemas/issues')
var expect = require('chai').expect;
// var MongoClient = require('mongodb');
// var ObjectId = require('mongodb').ObjectID;

// const CONNECTION_STRING = process.env.DATABASE;

// // MongoClient.connect(CONNECTION_STRING, function(err, db) {
// //   if (err) {
// //     console.log('error with database connection')
// //   } else {
// //     console.log(`connected to mongo database, ${db}`)
// //   }
// // });

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      res.send('hello there!')
      
    })
    
    .post( async function (req, res){
      var project = req.body
      console.log(project)
      await Issues.create(project)
      
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      
    });
    
};
