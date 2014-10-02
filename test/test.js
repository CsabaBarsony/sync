var main = require("../client/js/test.js");

describe("test", function(){
	it("blabla", function(){
		expect(main.sayName()).toBe("abc");
	});
});