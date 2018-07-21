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

});