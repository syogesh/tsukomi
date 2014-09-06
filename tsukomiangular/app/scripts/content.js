$(document).ready(function() {
    /*var url = $(location).attr('href');
    url = url.replace("http://","");
    url = url.replace("https://","");
    console.log(url);
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/api/comments/" + url + "/",
        success: function(data) {
            console.log(data);
        }
    });*/

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

    	$('.placeddiv').after().html('<form role="form" ng-submit="addPost(newPost.text)" class="tsukform">' + 
            '<input class="form-control" type="text" name="textbox" ng-model="newPost.text" autofocus />' + 
    		'<input id="add" type="submit" class="btn btn-default form-control" ng-disabled="isEmpty(newPost.text)" /></form>');
        
        /*$('.placeddiv').keypress(function (e) {
  			if (e.which == 13) {
  				console.log($('input').val());
    			$('#add').submit(function() {
    				console.log('submitted');
    			});
    			console.log('accessing');
    			return false;    //<---- Add this line
  			}
		});*/
		$(this).unbind('click');
	});

	/*$('body').click(function(e) {
    var offset = $(this).offset();
    alert(e.clientX - offset.left);
    alert(e.clientY - offset.top);
  });*/
});