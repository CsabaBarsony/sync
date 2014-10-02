var Dispatcher = require("./dispatcher.js");
var merge = require("react/lib/merge");
var EventEmitter = require("events").EventEmitter;
var CHANGE_EVENT = "change";

_items = {
	1: { data: Math.random(), ts: new Date().getTime() },
	2: { data: Math.random(), ts: new Date().getTime() }
};

var _nextKey = 3;

function _addItem(){
	_items[_nextKey] = { data: Math.random(), ts: new Date().getTime() };
	_nextKey++;
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
		return _items;
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