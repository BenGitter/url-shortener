var checkURL = require("./check-url");
var db = require("./db");

module.exports = function(link, callback){
  var response;

    // If invalid URL:
  if(!checkURL(link)){
    response = { "error": "Wrong url format, make sure you have a valid protocol and real site." };
    return callback(response);
  }

  original_url = link;
  db.insert({"original_url": original_url}, function(err, doc){
    if(err){
      response = { "error": "Database error, try again." };
    }else{
      var id = doc.ops[0]._id;
      var short_url = "https://honey-diver.hyperdev.space/" + id;
      response = { "original_url": original_url, "short_url": short_url };
    }

    callback(response);
  });
};
