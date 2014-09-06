$(document).ready(function() {
	console.log("accessed");
	$("body").click(function(e) {

		// find the position in the current window
		var wrapper = $(this).parent();
    	var parentOffset = wrapper.offset(); 
    	var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
    	var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

    	// add a div here
    	$(this).append($('<div/>').addClass('placeddiv').css({
        	left: relX,
        	top: relY,
    	}));    
    	$('.placeddiv').after().html('<input type="text" name="textbox' + '" value="" >');

		/*var newText = $(document.createElement('div'))
	     .attr("class", 'tsukomi');
 
		newText.after().html('<input type="text" name="textbox' + '" value="" >');
		newText.appendTo(".placeddiv"); // this is where the error is occurring */
		$(this).unbind('click');
	});
	/*$('body').click(function(e) {
    var offset = $(this).offset();
    alert(e.clientX - offset.left);
    alert(e.clientY - offset.top);
  });*/
});