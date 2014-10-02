var React = require("react");
var Button = require("./button.js");
var Display = require("./display.js");

var App = React.createClass({
	render: function(){
		return React.DOM.div(
			null,
			Button(null),
			Display(null)
		);
	}
});

module.exports = App;