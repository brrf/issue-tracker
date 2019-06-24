/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
const issueSchema = require('../schemas/issues')
const mongoose = require('mongoose');
let Testmodel = mongoose.model('test', issueSchema)

chai.use(chaiHttp);


suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);  
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'a required field'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          done();
        });
      });
      
      test('Missing required fields', function(done) {
         chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'something went wrong')      
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        let testissue = new Testmodel({issue_title: 'test', issue_text: 'test', created_by: 'test'})
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: testissue._id
        }
        )
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'no updated field sent')      
          done();
        });
      });
      
      test('One field to update', function(done) {
        let testissue = new Testmodel({issue_title: 'test', issue_text: 'test', created_by: 'test'})
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: testissue._id,
          issue_title: testissue.issue_title
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'successfully updated')      
          done();
        });
      });
      
      test('Multiple fields to update', function(done) {
        let testissue = new Testmodel({issue_title: 'test', issue_text: 'test', created_by: 'test'})
        chai.request(server)
        .put('/api/issues/test')
        .send({
          _id: testissue._id,
          issue_title: testissue.issue_title,
          issue_text: testissue.issue_text
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, 'successfully updated')      
          done();
        });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        let testissue1 = new Testmodel({issue_title: 'test', issue_text: 'test', created_by: 'test'})
        let testissue2 = new Testmodel({issue_title: 'test', issue_text: 'test2', created_by: 'test2'})
        testissue1.save()
        testissue2.save()
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_title: 'test'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        let testissue1 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test'})
        let testissue2 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test2'})
        testissue1.save()
        testissue2.save()
        chai.request(server)
        .get('/api/issues/test')
        .query({issue_title: 'test', issue_text: 'testtext'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        let testissue1 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test'})
        let testissue2 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test2'})
        testissue1.save()
        testissue2.save()
        chai.request(server)
        .delete('/api/issues/test')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, '_id error')
          done();
        });
      });
      
      test('Valid _id', function(done) {
        let testissue1 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test'})
        let testissue2 = new Testmodel({issue_title: 'test', issue_text: 'testtext', created_by: 'test2'})
        testissue1.save()
        testissue2.save()
        chai.request(server)
        .delete('/api/issues/test')
        .send({_id: testissue1._id})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.text, `deleted ${testissue1._id}`)
          done();
        });
      });
      
    });

});
