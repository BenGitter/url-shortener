// Require mongodb and set database to null
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var database = null;

// Function to open db connection
exports.connect = function(url, done){
  if(database) return done();

  MongoClient.connect(url, function(err, db){
    if(err) return done(err);

    database = db;
    done();
  });
}

// Function to get opened db
exports.get = function(){
  return database;
}

// Function to create new doc
exports.insert = function(doc, done){
  var collection = database.collection("url-shortener");

  collection.insert(doc, function(err,doc){
    if(err) return done(err);
    
    done(null, doc);
  });
}

// Function to find orignal_url from _id
exports.find = function(id, callback){
  var collection = database.collection("url-shortener");
  var id;
  if(ObjectId.isValid(id)){
    id = new ObjectId(id);
  }else{
    return callback("Incorrect id");
  }
  collection.findOne({
    "_id": id
  },{
    _id: 0,
    original_url: 1
  }, function(err, doc){
    if(err) return callback(err);

    if(doc){
      callback(null, doc.original_url);
    }else{
      callback("No matching url found.");
    }
  });
}


// Function to close db
exports.close = function(done){
  if(database){
    database.close(function(err, result){
      database = null;
      done(err);
    });
  }
}