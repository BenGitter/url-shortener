// Express
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

// Other dependencies
var db = require("./db");             // require db file
dotenv = require("dotenv").config();  // require dotenv
var api = require("./routes/api")     // require api router


app.use("/", api);

// Make db connection
db.connect(process.env.DB_URL, function(err){
  // Log an error if one occurs
  if(err){
    console.log('Unable to connect to MongoDB');
    process.exit(1);
  }
  // Start the app if the db connection was succesfull
  else{
    app.listen(port, function(){
      console.log('App listening on port', port);
    });
  }
});
