var $ = require("jquery");

$.ajax({
	type: "GET",
	url: "/list",
	success: function(data){
		console.log("list:", data);
	}
});