var express = require("express");
var app = express();

app.listen(3000, process.env.IP, function(){
  console.log("server started");
});
