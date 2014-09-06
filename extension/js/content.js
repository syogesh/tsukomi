$(document).ready(function() {

    function getAJAX() {
    $.ajax({
        contentType: 'application/json',
        type: "GET",
        dataType: "json",

        url: "http://localhost:8080/api/comments/?url=" + document.URL,

        success: function(data) {
          console.log(data);
            for (var i = 0; i < data.length; i++) {
                var id = '#' + data[i]['_id'];
                $("body").append($('<div id="' + data[i]['_id'] + '"/>')).css({
                    left: data[i]['position'][0],
                    top: data[i]['position'][1]
                });
                $(id).after().html('<div class="comment" style="left:' + 
                    data[i]['position'][0] + 'px; top:' + data[i]['position'][1] + 'px; position:absolute;">' +
                    '<a href="javascript:void(0)" class="upvote">▲</a>' +
            		'<a href="javascript:void(0)" class="downvote">▼</a>' + data[i]['text'] + '</div>');
            };
        }
    });
    }
    getAJAX();

    $(".upvote").click(function() {
    	console.log('accessed up');
    });

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
        console.log(current);
        $('.placeddiv').after().html('<form class="tsukform">' +
            '<input class="tsukomi" type="text" name="textbox' + '" value="" id="t' + count + '" />' +
            '<input type="submit" style="display: none;"></form>');
        /*
        $('.placeddiv').after().html('<input class="tsukomi" type="text" name="textbox' + '" value="" id="t' + count + '" />' + 
            '<span id="tsuktxt-' + count + '"></span><input type="submit" style="display: none;">');
        */
        $('input').keypress(function (e) {
            if (e.which == 13) {
                var comment = {'text': $(this).val(), 'xPos': relX, 'yPos': relY};
                $.ajax({
                    type: "PUT",
                    data: comment,

                    url: "http://localhost:8080/api/comments/?url=" + document.URL,

                    success: function(data) {
                        console.log(data);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                current.css('display', 'none');
                $('input').css('display', 'none');
                getAJAX();

                return false;    
            }
        });
        $(this).unbind('click');
        count = count + 1;
    });
});
