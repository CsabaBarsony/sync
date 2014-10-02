var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var portNumber = 8888;
var mqtt = require("mqtt");
var client = mqtt.createClient(1883, "localhost");
var list = {};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

function changeList(){
	var key = "" + Math.floor(Math.random() * 5 + 1);
	if(list[key]){
		if(Math.random() > 0.5){
			delete list[key];
			client.publish("/devices/" + key, "");
			//console.log("delete " + key);
		}
		else {
			list[key].data = "" + Math.random();
			list[key].ts = "" + new Date().getTime();
			client.publish("/devices/" + key, JSON.stringify(list[key]));
			//console.log("update " + key);
		}
	}
	else{
		list[key] = {
			data: "" + Math.random(),
			ts: "" + new Date().getTime()
		};
		client.publish("/devices/" + key, JSON.stringify(list[key]));
		//console.log("create " + key);
	}
	console.log(list);
	setTimeout(function(){changeList()}, 2000);
	//setTimeout(function(){changeList()}, Math.floor(Math.random() * 10 + 1) * 1000);
}

changeList();

app.get("/list", function(req, res){
	res.send(list);
});

app.listen(portNumber);
console.log("server listening on port", portNumber);