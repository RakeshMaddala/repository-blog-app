var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var blog = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setting up Mongo db connections and BLOG Database CRUDS
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var mongodbUrl = 'mongodb://mcwane:mcwane@ds021694.mlab.com:21694/mcwane-blogs';
var mongoDb ;

MongoClient.connect(mongodbUrl, (err, database) => {
  if (err) return console.log(err)
  mongoDb = database ;
})

app.get('/', blog.home);

/* REST CRUD operation for key:value pair table */
// Read rest api
app.get("/blogs", function(req, res) {
  mongoDb.collection("blogs").find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get blogs.");
    } else {
      res.status(200).json(docs);
    }
  });
});
// Create rest api
app.post("/blogs", function(req, res) {
  var newBlog = req.body;
  console.log(newBlog);
  mongoDb.collection("blogs").insertOne(newBlog.message, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new blog.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});
// Update Rest API
app.put("/blogs/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;
  console.log("Updating the blog, param oid: "+req.params.id)
  mongoDb.collection("blogs").updateOne({_id: new ObjectId(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update blog");
    } else {
      res.status(204).end();
    }
  });
});
// Delete rest api
app.delete("/blogs/:id", function(req, res) {
  mongoDb.collection("blogs").deleteOne({_id: new ObjectId(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete blog");
    } else {
      res.status(204).end();
    }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
