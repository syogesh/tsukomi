$(document).ready(function() {
	var serverURL = "ec2-54-68-38-168.us-west-2.compute.amazonaws.com:8080";
	// var serverURL = "localhost:8080";
	
	// TODO: clean the document URL
	var docURL = document.URL;
	// var start = docURL.indexOf("//");
	// var end = docURL.indexOf("?");
	// if (start == -1) {
	// 	start = -2;
	// }
	// if (end == -1) {
	// 	end = name.length;
	// }

	// docURL = docURL.substring(start + 2, end);
	// if (docURL[docURL.length - 1] == "/") {
	// 	docURL = docURL.substring(0, docURL.length - 2);
	// }

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
					if ($(id).length == 0) { 
						$("body").append('<div id="' + data[i]['_id'] + '" class="yodel-111-comment" style="max-width: 400px; min-width: 100px; position:absolute; left:' + 
							data[i]['position'][0] + 'px; top:' + data[i]['position'][1] + 'px;"></div>');
						$(id).after().html('<div>' + data[i]['votes'] + '</div>' + '<div><div class="yodel-111-up-arrow"></div><div class="yodel-111-down-arrow"></div></div>' + '<div>' + data[i]['text'] + '</div>');
					}
				};
			}
		});
	}

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

	function downBtn() {
		$("body").on("click", ".yodel-111-down-arrow", function() {
			var commentId = $(this).parent().parent().attr('id');
			postAJAX(commentId, -1);
			var newVote = parseInt($("#" + commentId).children(":first").text()) - 1;
			$("#" + commentId).children(":first").html(newVote);
			return false;
		});
	}

	function upBtn() {
		$("body").on("click", ".yodel-111-up-arrow", function() {
			var commentId = $(this).parent().parent().attr('id');
			postAJAX(commentId, 1);

			var newVote = parseInt($("#" + commentId).children(":first").text()) + 1;
			$("#" + commentId).children(":first").html(newVote);
			return false;
		});		
	}

	var u = upBtn();
	var d = downBtn();
	u; 
	d; 
	u = undefined;
	d = undefined;

	$("body").click(function(e) {
		console.log("accessed");
		// find the position in the current window
		var wrapper = $(this).parent();
		var parentOffset = wrapper.offset(); 
		var relX = e.pageX - parentOffset.left + wrapper.scrollLeft();
		var relY = e.pageY - parentOffset.top + wrapper.scrollTop();

		var id = "yodel-111-add-textarea";

		if ($('.yodel-111-comment:hover').length != 0) {
            return false;
        }
		var addCommentDiv = $('<div id="' + id + '" class="yodel-111-add" style="height:auto; left:' + 
			relX + 'px; top:' + relY + 'px;"><textarea></textarea><button>Submit</button></div>');


		$(document).mouseup(function (e) {
    		var container = addCommentDiv;

    		if (!addCommentDiv.is(e.target) && addCommentDiv.has(e.target).length === 0) {
        		addCommentDiv.remove();
    		}
    		else {
    			//$('body').unbind('click');
    			upBtn();
    			downBtn();
    			$('body').unbind('click');
    		}
		});

		addCommentDiv.find('button').click(function() {
			var elem = $("#" + id + " > textarea");
			console.log(elem.val());
			var txt = elem.val().trim();
            if (!txt) {
                console.log('empty');
                elem.remove();
                $('button').remove();
                return false;
            }
			var comment = { text: txt, xPos: relX, yPos: relY };
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
					$("body").append('<div id="' + data[0]['_id'] + '" class="yodel-111-comment" style="max-width: 400px; min-width: 100px; position:absolute; left:' + 
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
		$("body").unbind('click');
	});
	
	getAJAX();

});
