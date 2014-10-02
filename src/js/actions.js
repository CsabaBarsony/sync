var Dispatcher = require("./dispatcher.js");

var Actions = {
	addItem: function(){
		Dispatcher.handleViewAction({
			actionType: "addItem"
		})
	}
};

module.exports = Actions;