$(document).ready(function() {
	console.log("accessed");
	var count = 0;
	$("body").click(function(e) {
		if (current) {
			console.log(current);
		}
		else {
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
    	var current = $('.placeddiv');
    	console.log(current);
    	console.log(current[0]);
    	$('.placeddiv').after().html('<form class="tsukform"><input class="tsukomi" type="text" name="textbox' + '" value="" id="t' + count + '">' + 
    		'<input type="submit" style="display: none;"></form>');

    	$('input').keypress(function (e) {
  			if (e.which == 13) {
  				console.log($(this).val());
  				$('#t0').val('save');
    			return false;    //<---- Add this line
  			}
		});
		$(this).unbind('click');
		count = count + 1;
		}
	});

	/*$('body').click(function(e) {
    var offset = $(this).offset();
    alert(e.clientX - offset.left);
    alert(e.clientY - offset.top);
  });*/
});