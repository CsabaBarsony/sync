var _ = require("underscore");

var list = ["a", "b", "c"];

module.exports = {
	sayName: function(){
		var result = "";
		_.each(list, function(char){
			result += char;
		});
		return result;
	}
};