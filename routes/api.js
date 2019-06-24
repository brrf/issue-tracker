/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const issueSchema = require('../schemas/issues')
const expect = require('chai').expect;
const mongoose = require('mongoose');

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(async function (req, res){
      let project = mongoose.model(req.params.project, issueSchema)
      let issues = await project.find(req.query)
      res.json(issues);
      
    })
    
    .post(async function (req, res){
      let project = mongoose.model(req.params.project, issueSchema)
      let issue = req.body
      try {
       const newIssue = await project.create(issue);
       await res.json(newIssue);
      }
      catch {
        res.send('something went wrong')
      }    
    })
    
    .put(async function (req, res){
      let project = mongoose.model(req.params.project, issueSchema)

      let issue = req.body
      const id = req.body._id
      delete req.body._id;

      for (let key in issue) {
        if (issue[key] === '') delete issue[key]
      }
      if (Object.keys(issue).length === 0) {
        return res.send('no updated field sent')
      }

      issue.updated_on = new Date();

      try {
        await project.findByIdAndUpdate(id, issue, {new: true}).exec(); 
        await res.send('successfully updated')     
      }
      catch {
        res.send(`could not update ${id}`)
      }
      
    })
    
    .delete(async function (req, res){
      let project = mongoose.model(req.params.project, issueSchema)
      if (!req.body._id) {
        return res.send('_id error');
      }
      try {
        await project.findByIdAndDelete(req.body._id).exec();
        res.send(`deleted ${req.body._id}`)
      }
      catch {
        res.send(`could not delete ${req.body._id}`)
      }     
    });
};
