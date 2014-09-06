$(document).ready(function() {
	console.log("accessed");
	var url = $(location).attr('href');
    url = url.replace("http://","");
    url = url.replace("https://","");

    url = "google.com";
    console.log(url);
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/api/comments/" + url + "/",
        success: function(data) {
        	//var count = 0;
        	for (var i = 0; i < data.length; i++) {
            //data.forEach(function(item) {
            	var id = "#tc" + i;
            	$("body").append($('<div id="tc' + i + '"/>')).css({
            		left: data[i]['position'][0],
            		top: data[i]['position'][1]
            	});
    			$(id).after().html('<div class="comment" style="left:' + 
    				data[i]['position'][0] + 'px; top:' + data[i]['position'][1] + 'px; position:absolute;">' + data[i]['text'] + '</div>');
    			//$(id).after().html(data[i]['text']);
    			/*$(id).addClass('comment').css({
            		left: data[i]['position'][0],
            		top: data[i]['position'][1],
            		});*/
    			//count = count + 1;
            //});
        	};
        }
    });

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
  				var comment = {'text': $(this).val(), 'xPos': relX, 'yPos': relY, 'url': url};
  				$.ajax({
  					type: "PUT",
  					data: comment,
  					url: "http://localhost:8080/api/comments/" + url + "/",
  					success: function(data) {
  						console.log(data);
  					},
  					error: function(e) {
    					console.log(e);
  					}
  				});
  				//$('#t0').val('save');
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