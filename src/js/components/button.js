var React = require("react");
var Actions = require("../actions.js");

var Button = React.createClass({
	addItem: function(){
		Actions.addItem();
	},
	render: function(){
		return React.DOM.button({ onClick: this.addItem }, "click");
	}
});

module.exports = Button;