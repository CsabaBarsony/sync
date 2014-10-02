var $ = require("jquery");
$.ajax({
	type: "GET",
	url: "/test",
	success: function(data){
		console.log("api data:", data);
	}
});