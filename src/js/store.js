var Dispatcher = require("./dispatcher.js");
var merge = require("react/lib/merge");
var EventEmitter = require("events").EventEmitter;
var xhr = require("xhr");
var CHANGE_EVENT = "change";
var client = new Paho.MQTT.Client("localhost", 8000, "csati");

var items = {};

client.connect({
	onSuccess: function(){
		console.log("connected to MQTT server");
		client.subscribe("items/#");
	}
});

client.onMessageArrived = function(message){
	console.log(message.payloadString);
};

function _addItem(){
	xhr({
		method: "post",
		body: JSON.stringify({ data: "majom" }),
		uri: "/list/add",
		headers: {
			"Content-Type": "application/json"
		}
	}, function(){});
}

var Store = merge(EventEmitter.prototype, {
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	getItems: function(){
		return {};
	},

	dispatcherIndex: Dispatcher.register(function(payload){
		var action = payload.action;
		switch (action.actionType){
			case "addItem":
				_addItem();
				break;
		}
		Store.emitChange();
		return true;
	})
});

module.exports = Store;