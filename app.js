var express = require('express');
var todoController = require("./controllers/todoControllers");
var PORT = process.env.PORT || 3000;

var app = express();

//Template Engine 
app.set("view engine", "ejs");

//static file 
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port 
app.listen(PORT);