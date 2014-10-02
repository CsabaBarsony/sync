var $ = require("jquery");
var x = 1;

$.ajax({
	type: "GET",
	url: "/list",
	success: function(data){
		console.log("list:", data);
	}
});