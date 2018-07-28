$( document ).ready(function() {


// BORDER
	function borders() {
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
	}

	borders();

// VID HOVER
	function videoHover() {
		var figure = $(".video-wrapper").hover( hoverVideo, hideVideo );

		function hoverVideo(e) {  
	    $('video', this).get(0).play(); 
	    $('video', this).removeClass('video-filter');
		}

		function hideVideo(e) {
	    $('video', this).get(0).pause(); 
	    $('video', this).addClass('video-filter');
		}
	};


	videoHover();

// BARBA

 //    var transEffect = Barba.BaseTransition.extend({
 //        start: function(){
 //          this.newContainerLoading.then(val => this.fadeInNewcontent($(this.newContainer)));
 //        },
 //        fadeInNewcontent: function(nc) {
 //          nc.hide();
 //          var _this = this;
 //          $(this.oldContainer).fadeOut(100).promise().done(() => {
 //            nc.css('visibility','visible');
 //            nc.fadeIn(100, function(){
 //              _this.done();
 //            })
 //          });
 //        }
 //    });



	// Barba.Pjax.getTransition = function() {
	//     return transEffect;
	// }

    Barba.Pjax.start();

    Barba.Dispatcher.on('newPageReady', function() {
		borders();
		videoHover();
	});

});