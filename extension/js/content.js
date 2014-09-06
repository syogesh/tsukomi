$(document).ready(function() {
 	var serverURL = "ec2-54-68-38-168.us-west-2.compute.amazonaws.com:8080";
 	// var serverURL = "localhost:8080";

	function getAJAX() {
		console.log("getting previous comments");
		$.ajax({
			contentType: 'application/json',
			type: "GET",
			dataType: "json",

			url: "http://" + serverURL + "/api/comments/?url=" + document.URL,

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
				};
			}
		});
	}
	getAJAX();

	var count = 0;
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
			var current = $('.placeddiv');
			// console.log(current);
			$('.placeddiv').after().html('<input class="tsukomi" type="text" name="textbox' + '" value="" id="t' + count + '" />' + 
				'<span id="tsuktxt-' + count + '"></span><input type="submit" style="display: none;">');

			console.log("placed div");
			$('input').keypress(function (e) {
				if (e.which == 13) {
					console.log("sending request");
					var comment = {'text': $(this).val(), 'xPos': relX, 'yPos': relY};
					$.ajax({
						type: "PUT",
						data: comment,

						url: "http://" + serverURL + "/api/comments/?url=" + document.URL,

						success: function(data) {
							console.log("success!");
						},
						error: function(e) {
							console.log("failed");
						}
					});
					current.css('display', 'none');
					$('input').css('display', 'none');
					getAJAX();
					//$('#t0').val('save');
					return false;    //<---- Add this line
				}
		});
		$(this).unbind('click');
		count = count + 1;
	});

	/*$('body').click(function(e) {
		var offset = $(this).offset();
		alert(e.clientX - offset.left);
		alert(e.clientY - offset.top);
	});*/
});