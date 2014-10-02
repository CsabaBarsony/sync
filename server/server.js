var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var portNumber = 8888;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/test", function(req, res){
	res.send("test data from api");
});

app.listen(portNumber);
console.log("server listening on port", portNumber);