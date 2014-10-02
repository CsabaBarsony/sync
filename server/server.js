var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var portNumber = 8888;
var mqtt = require("mqtt");
var _ = require("underscore");

var client = mqtt.createClient(1883, "localhost");
client.subscribe("items/#");
client.on("message", function(topic, message){
	console.log(message);
});
var list = {
	1: { data: Math.random(), ts: new Date().getTime() },
	2: { data: Math.random(), ts: new Date().getTime() }
};
var nextKey = 3;
_.each(list, function(item, key){
	console.log("item", item);
	console.log("key", key);
	client.publish("items/" + key, JSON.stringify(item));
});

app.use(bodyParser.json());

app.get("/list", function(req, res){
	res.send(list);
});

app.post("/list/add", function(req, res){
	list[nextKey] = { data: req.body.data, ts: new Date().getTime() };
	client.publish("items/" + nextKey, JSON.stringify(list[nextKey]));
	nextKey++;
	return res.status(200).end();
});

app.use(express.static(path.join(__dirname, "../public")));

app.listen(portNumber);
console.log("server listening on port", portNumber);