$( document ).ready(function() {

// BORDER
	$(function() {
		var sectionTop = $('#border-top-trigger').offset().top;
		$('#top').hide();
		$('#bottom').hide();
		$(window).scroll(function() {

			var scroll = $(window).scrollTop();

			if ($(window).scrollTop() > sectionTop) {
				$('#top').show();
			} else {
				$('#top').hide();
			}

			if (scroll >= 15) {
				$('#bottom').show();
			} else {
				$('#bottom').hide();
			}
		});
	})
// VID HOVER
	$(function() {
		var figure = $(".video-wrapper").hover( hoverVideo, hideVideo );

		function hoverVideo(e) {  
		    $('video', this).get(0).play(); 
		    $('video', this).removeClass('video-filter');
		}

		function hideVideo(e) {
		    $('video', this).get(0).pause(); 
		    $('video', this).addClass('video-filter');
		}
	});
});