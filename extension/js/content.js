$(document).ready(function() {
	console.log("accessed");
	$("body").click(function() {
		var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv');
 
		newTextBoxDiv.after().html('<label>Textbox #' + ' : </label>' +
	      '<input type="text" name="textbox' + 
	      '" id="textbox' + '" value="" >');
 
		newTextBoxDiv.appendTo("body");
	});
});