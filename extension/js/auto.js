	console.log('hi');
    var url = $(location).attr('href');
    url = url.replace("http://","");
    url = url.replace("https://","");
    url = "stackoverflow.com";
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
        	};
        }
    });