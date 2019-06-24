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
      let project = req.params.project;
      res.send('hello there!')
      
    })
    
    .post(async function (req, res){
      let project = req.body
      const newIssue = await Issues.create(project);
      await res.json(newIssue);
    })
    
    .put(async function (req, res){
      let project = req.body;
      const id =req.body._id

      delete req.body._id;
      for (let key in project) {
        if (project[key] === '') delete project[key]
      }
      await Issues.findByIdAndUpdate(id, project, {new: true})      
    })
    
    .delete(async function (req, res){
      await Issues.findByIdAndDelete(req.body._id)
    });
    
};
