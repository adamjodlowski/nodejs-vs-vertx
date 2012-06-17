// MongoDB connection

var mongoose = require('mongoose');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/nodejs', function() {

  // clearing database
  PostModel.remove({}, function(err, deleted) {});

});

// post schema

var Schema = mongoose.Schema;

var Post = new Schema({
  author: String,
  date: Date,
  content: String
});

mongoose.model('Post', Post);
PostModel = mongoose.model('Post');

// Restify config

var restify = require('restify');  
var server = restify.createServer({
  name: 'Node.js vs vert.x server'
});
server.use(restify.bodyParser());
server.use(restify.queryParser());

// don't send custom headers back

restify.defaultResponseHeaders = null;

// post route handler

server.get('/post', function(req, res) {

  var post = new PostModel(); 
  post.author = randomString(16);
  post.date = new Date();
  post.content = randomString(160);

  post.save(function (err) {

    if (err) {
      res.send(500);
    } else {

      PostModel.find().limit(100).execFind(function (err, data) {

        if (err) {
          res.send(500);
        } else {

          res.send(200, data);

        }
        
      });

    }

  });

});

// hello route handler

server.get('/hello', function(req, res) {

  res.send(200, {message: 'hello'});

});

// render route handler

server.get('/render', function(req, res) {

  var response = randomString(10000);

  res.send(200, {page: response});

});

// fibonacci route handler

server.get('/fibonacci', function(req, res) {

  fibonacci(30);

  res.send(200, {fibonacci: 'calculated'});

});     

// starting server

server.listen(1337, function() {
  console.log(server.name + ' is listening at ' + server.url);
});

// helper function for random string generation

var randomString = function(_len) {

  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  var len = _len || 160;
  var result = '';
  var rand;
  
  for(var i = 0; i < len; i++) {
    rand = Math.floor(Math.random()*(alphabet.length+1));
    result += alphabet.substring(rand, rand + 1);
  }
    
  return result;

};

// helper Fibonacci function

var fibonacci = function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
}