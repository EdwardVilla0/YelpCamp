var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/campgrounds", function(req, res){
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    }else{
      res.render("index", {campgrounds: allCampgrounds});
    }
  });
  //res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  });
  //campgrounds.push(newCampground);
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

// shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {campground: foundCampground});
    }
  });
});

app.listen(3000, process.env.IP, function(){
  console.log("server started");
});
