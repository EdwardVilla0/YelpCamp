var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema set up

// Campground.create(
//   {
//     name: "grandit hill",
//     image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
//     description: "beautiful water front views"
//   }, function(err, campground){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Newly Created Campground");
//       console.log(campground);
//     }
//   }
// );

var campgrounds = [
  {name: "salmon creek", image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350"},
  {name: "grandit hill", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
  {name: "mountain goat's rest", image: "https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg?auto=compress&cs=tinysrgb&h=350"}
];

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
  Campground.findById(req.params.id, function(err, foundCampground){
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
