$(document).ready(function() {
	console.log("hi");
	alert($("body").css("background-color"));
	$(document).onclick = function(e)
	{
    var x = e.pageX;
    var y = e.pageY;
    alert("User clicked at position (" + x + "," + y + ")")
	};
});