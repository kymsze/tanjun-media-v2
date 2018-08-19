$( document ).ready(function() {

	// CAROUSEL 

	function defer(method) {
	    if (window.jQuery)
	        method();
	    else
	        setTimeout(function() {
	            defer(method)
	        }, 50);
	}

	defer(function() {
	    (function($) {

	        function doneResizing() {
	            var totalScroll = $('.resource-slider-frame').scrollLeft();
	            var itemWidth = $('.resource-slider-item').width();
	            var difference = totalScroll % itemWidth;
	            if (difference !== 0) {
	                $('.resource-slider-frame').animate({
	                    scrollLeft: '-=' + difference
	                }, 500, function() {
	                    // check arrows
	                });
	            }
	        }

	        $('.arrow').on('click', function() {
	            var $this = $(this),
	                width = $('.resource-slider-item').width(),
	                speed = 500;
	            if ($this.hasClass('prev')) {
	                $('.resource-slider-frame').animate({
	                    scrollLeft: '-=' + width
	                }, speed, function() {
	                    // check arrows
	                });
	            } else if ($this.hasClass('next')) {
	                $('.resource-slider-frame').animate({
	                    scrollLeft: '+=' + width
	                }, speed, function() {
	                    // check arrows
	                });
	            }
	        }); // end on arrow click

	        $(window).on("load resize", function() {
	        	var resourceWidth = $('.resource').first().width();

				$('.carousel-img').each(function() {
					var $this = $(this)
				  	if ($this.width() > resourceWidth) {
						$this.css({
						  '-webkit-transform' : 'translateX(-20%)',
						  '-moz-transform'    : 'translateX(-20%)',
						  '-ms-transform'     : 'translateX(-20%)',
						  '-o-transform'      : 'translateX(-20%)',
						  'transform'         : 'translateX(-20%)'
						});
				  	}
				});

	            $('#resource-slider .resource-slider-item').each(function(i) {
	                var $this = $(this),
	                    left = $this.width() * i;
	                $this.css({
	                    left: left
	                })
	            }); // end each
	        }); // end window resize/load

	        var resizeId;
	        $(window).resize(function() {
	            clearTimeout(resizeId);
	            resizeId = setTimeout(doneResizing, 500);
	        });

	    })(jQuery); // end function
	});




	// BORDER
	function borders() {

		var header = $('.full-screen-wrapper'),
			top = $('#top'),
			bottom = $('#bottom');

		$(window).on('scroll', function () {
		  
			var scrollTop = $(this).scrollTop(),
				height = header.innerHeight(),
				offset = height / 2,
				range = height / 4,
				calcbg = 1 - (scrollTop - offset + range) / range;
				calcbor = 0 + (scrollTop - offset + range) / range;

			header.css({ 'opacity': calcbg });
			top.css({ 'opacity': calcbor });
			bottom.css({ 'opacity': calcbor });

			if (calcbg < '0') {
				header.css({ 'opacity': 0 });
				top.css({ 'opacity': 1 });
				bottom.css({ 'opacity': 1 });
			} else if ( calcbg > '1' ) {
				header.css({ 'opacity': 1 });
				top.css({ 'opacity': 0 });
				bottom.css({ 'opacity': 0 });
			}
		  
		});
	}

	borders();




	// HEADER COLOUR SWAP 

	// Detect request animation frame
	var scroll = window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| window.oRequestAnimationFrame
		// IE Fallback, you can even fallback to onscroll
		|| function(callback){ window.setTimeout(callback, 1000/60) };
	var lastPosition = -1;

	// my Variables
	var lastSection = false;
	var replaceItemTop = -1;
	var replaceItemBottom = -1;
	var replaceItemHeight = -1;
	 
	// The Scroll Function
	function loop(){
		var top = window.pageYOffset;
		// my variables

		// my sections to calculate stuff
		var sections = document.querySelectorAll('.section');
		var replaceContainer = document.querySelectorAll('.js-replace');
		var replaceItem = document.querySelectorAll('.js-replace__item');

		if (replaceItem.length > 0) {
			// get top position of item from container, because image might not have loaded
			replaceItemTop = parseInt(replaceContainer[0].getBoundingClientRect().top);
			replaceItemHeight = replaceItem[0].offsetHeight;
			replaceItemBottom = replaceItemTop + replaceItemHeight;
		}

		var sectionTop = -1;
		var sectionBottom = -1;
		var currentSection = -1;
	  
		// Fire when needed
		if (lastPosition == window.pageYOffset) {
			scroll(loop);
			return false;
		} else {
			lastPosition = window.pageYOffset;

			// Your Function
			Array.prototype.forEach.call(sections, function(el, i){
			sectionTop = parseInt(el.getBoundingClientRect().top);
			sectionBottom = parseInt(el.getBoundingClientRect().bottom);

			// active section
			if ( (sectionTop <= replaceItemBottom) && (sectionBottom > replaceItemTop)) {
				// check if current section has bg
				currentSection = el.classList.contains('section--bg');

				// switch class depending on background image
				if ( currentSection ) { 
					replaceContainer[0].classList.remove('js-replace--reverse');
				} else {
					replaceContainer[0].classList.add('js-replace--reverse')
				}
			}
			// end active section

			// if active Section hits replace area
			if ( (replaceItemTop < sectionTop) && ( sectionTop <= replaceItemBottom) ) {
				// animate only, if section background changed
				if (currentSection != lastSection)  {
					document.documentElement.style.setProperty('--replace-offset', 100 / replaceItemHeight * parseInt(sectionTop - replaceItemTop) + '%');
				}
			}
			// end active section in replace area

			// if section above replace area
			if ( replaceItemTop >= sectionTop ) {
				// set offset to 0 if you scroll too fast
				document.documentElement.style.setProperty('--replace-offset', 0 + '%');
				// set last section to current section
				lastSection = currentSection;
		    }

		  }); 

		}

		// Recall the loop
		scroll( loop )
	}

	// Call the loop for the first time
	loop();





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




	// NAVIGATION 
	function openNav() {
		$(".nav").click(function() {
			console.log("clicked");
			$(".nav").toggleClass( 'is-active');
			$(".navigation").slideToggle();
			$("body").toggleClass('fixed');
		});
	};

	openNav();



	// BARBA

    var transEffect = Barba.BaseTransition.extend({
        oldContainer: function(){
        },
        start: function(){

			Promise
			.all([this.newContainerLoading, this.scrollTop()])
			.then(this.fadeIn.bind(this));
        },
		scrollTop: function() {
			var deferred = Barba.Utils.deferred();
			var obj = { y: window.pageYOffset };

			TweenLite.to(obj, 0.7, {
				y: 0,
				
				onUpdate: function() {
					if (obj.y === 0) {
						deferred.resolve();
					}

					window.scroll(0, obj.y);
				},
				onComplete: function() {
				    deferred.resolve();
				}
			});

			return deferred.promise;
		},
		fadeIn: function() {

			var _this = this;
			var $el = $(this.newContainer);


			$(this.oldContainer).hide();

			$el.css({
				visibility : 'visible',
				opacity : 0
			});


			$el.animate({ opacity: 1 }, 200, function() {
			    document.body.scrollTop = 0;
				_this.done();
				borders();
				videoHover();
				openNav();
				loop();
			});
		}
    });


	// WINDOW RESIZE


	window.onresize = function(event) {
		loop();
		borders();
	};

});

