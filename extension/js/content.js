$(document).ready(function() {
	//var serverURL = "ec2-54-68-38-168.us-west-2.compute.amazonaws.com:8080";
	var serverURL = "localhost:8080";

	// TODO: clean the document URL
	var docURL = document.URL;

	function getAJAX() {
		$.ajax({
			contentType: 'application/json',
			type: "GET",
			dataType: "json",
			url: "http://" + serverURL + "/api/comments/?url=" + docURL,

			success: function(data) {
				// placing each box
				for (var i = 0; i < data.length; i++) {
					var id = '#' + data[i]['_id'];
					$("body").append('<div id="' + data[i]['_id'] + '" class="yodel-111-comment" style="left:' + 
						data[i]['position'][0] + 'px; top:' + data[i]['position'][1] + 'px;"></div>');

					$(id).after().html('<div class="yodel-111-num-votes">' + data[i]['votes'] + '</div>' + '<div><div class="yodel-111-up-arrow"></div><div class="yodel-111-down-arrow"></div></div>' + '<div>' + data[i]['text'] + '</div>');
				};
			}
		});
	}

	$("body").click(function(e) {
		// find the position in the current window
		var wrapper = $(this).parent();
		var parentOffset = wrapper.offset(); 
		var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
		var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

		var id = "yodel-111-add-textarea";

		var addCommentDiv = $('<div id="' + id + '" class="yodel-111-add" style="left:' + 
			relX + 'px; top:' + relY + 'px;"><textarea></textarea><button>Submit</button></div>');

		addCommentDiv.find('button').click(function() {
			var elem = $("#" + id + " > textarea");
			console.log(elem.val());
			var comment = { text: elem.val(), xPos: relX, yPos: relY };
			$.ajax({
				type: "PUT",
				data: comment,

				url: "http://" + serverURL + "/api/comments/?url=" + docURL,

				success: function(data) {
					console.log(data);
					
					$("#" + id).remove();

					if (data.length == 0) {
						// you dun messed up
						return;
					}

					var newId = '#' + data[0]['_id'];
					$("body").append('<div id="' + data[0]['_id'] + '" class="yodel-111-comment" style="left:' + 
						data[0]['position'][0] + 'px; top:' + data[0]['position'][1] + 'px;"></div>');

					$(newId).after().html('<div class="yodel-111-num-votes">' + data[0]['votes'] + '</div>' + '<div><div class="yodel-111-up-arrow"></div><div class="yodel-111-down-arrow"></div></div>' + '<div>' + data[0]['text'] + '</div>');
				},
				error: function(e) {
					console.log(e);
				}
			});
		});

		$("body").append(addCommentDiv);
		$("#" + id).find('textarea').focus();
		
		$(this).unbind('click');
	});
	
	function postAJAX(commentId, vote) {
		$.ajax({
			type: "POST",
			data: { "id": commentId, "vote": vote },
			url: "http://" + serverURL + "/api/comments/?url=" + docURL,

			success: function(data) {
				console.log(data);
			},
			error: function(e) {
				console.log(e);
			}
		});
	}

	$("body").on("click", ".yodel-111-up-arrow", function() {
		var commentId = $(this).parent().parent().attr('id');
		postAJAX(commentId, 1);

		var newVote = parseInt($("#" + commentId).children(":first").text()) + 1;
		$("#" + commentId).children(":first").html(newVote);
		return false;
	});

	$("body").on("click", ".yodel-111-down-arrow", function() {
		var commentId = $(this).parent().parent().attr('id');
		postAJAX(commentId, -1);
		var newVote = parseInt($("#" + commentId).children(":first").text()) - 1;
		$("#" + commentId).children(":first").html(newVote);
		return false;
	});

	getAJAX();
});
