var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment"),
    Campground      = require("./models/campground"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user");

var commentRoutes         = require("./routes/comments"),
    campgroundRoutes      = require("./routes/campgrounds"),
    indexRoutes           = require("./routes/index");



// mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
mongoose.connect("mongodb+srv://EdwardVilla0:Eddlover0@cluster0.bf3xc.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//seedDB();

// passport config
app.use(require("express-session")({
  secret: "Secret setup",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

// app.listen(3000, process.env.IP, function(){
//   console.log("server started");
// });

app.listen(process.env.PORT || 3000, process.env.IP, function(){
  console.log("server started");
});
