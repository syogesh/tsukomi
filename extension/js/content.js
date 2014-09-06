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

    	$('.placeddiv').after().html('<form class="tsukform"><input class="tsukomi" type="text" name="textbox' + '" value="">' + 
    		'<input type="submit" style="display: none;"></form>');

    	$('.placeddiv').keypress(function (e) {
  			if (e.which == 13) {
  				console.log($('input').val());
    			$('form').submit(function() {
    				console.log('submitted');
    			});
    			console.log('accessing');
    			return false;    //<---- Add this line
  			}
		});
		$(this).unbind('click');
	});

	/*$('body').click(function(e) {
    var offset = $(this).offset();
    alert(e.clientX - offset.left);
    alert(e.clientY - offset.top);
  });*/
});