// Dependencies
var express = require("express");
var router = express.Router();
var db = require("./../db");
var shortenURL = require("./../shorten-url");

// Routes
router
  // API docs
  .get("/", function (req, res) {
    res.sendFile("index.html", { root: "./public" });
  })

  // Create new short URL
  .get("/new/*", function(req,res){
    // Shorten link
    var link = req.params[0];

    shortenURL(link, function(response){
      res.json(response);
    });
  })

  // Retrieve URL and redirect
  .get("/:id", function(req,res){
    var id = req.params.id;

    db.find(id, function(err, url){
      if(err){
        res.json({"error": err});
      } 

      // Check if url is found
      if(url){
        res.redirect(url);
      }
      
      //console.log(url);
      //res.redirect(url);
    });

  });

// Return router
module.exports = router;

