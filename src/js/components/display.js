var React = require("react");
var Store = require("../store.js");
var _ = require("underscore");

var Display = React.createClass({
	getInitialState: function(){
		return { items: Store.getItems()};
	},
	componentWillMount: function(){
		Store.addChangeListener(this.onChange)
	},
	onChange: function(){
		this.setState(Store.getItems());
	},
	render: function(){
		var items = [];
		_.each(this.state.items, function(item){
			items.push(React.DOM.tr(
				null,
				React.DOM.td(null, "data: " + item.data),
				React.DOM.td(null, "ts: " + item.ts)
			));
		});
		return React.DOM.div(
			null,
			React.DOM.table(
				null,
				React.DOM.tbody(
					null,
					items
				)
			)
		);
	}
});

module.exports = Display;