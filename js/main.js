
 
 AOS.init({
 	duration: 800,
 	easing: 'slide'
 });

(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	// Scrollax
   $.Scrollax();



   // Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){

			var $this = $(this);

			// Add active class for hamburger animation
			setTimeout(function() {
				if ($('#ftco-nav').hasClass('show')) {
					$this.addClass('active');
				} else {
					$this.removeClass('active');
				}
			}, 10);

		});

		// Listen for Bootstrap collapse events
		$('#ftco-nav').on('shown.bs.collapse', function() {
			$('.js-fh5co-nav-toggle').addClass('active');
		});

		$('#ftco-nav').on('hidden.bs.collapse', function() {
			$('.js-fh5co-nav-toggle').removeClass('active');
		});

	};
	burgerMenu();


	var onePageClick = function() {


		$(document).on('click', '#ftco-nav a[href^="#"]', function (event) {
	    event.preventDefault();

	    var href = $.attr(this, 'href');

	    // Close mobile menu if open
	    if ($(window).width() < 992) {
	    	$('.navbar-collapse').collapse('hide');
	    }

	    $('html, body').animate({
	        scrollTop: $($.attr(this, 'href')).offset().top - ($(window).width() < 768 ? 80 : 70)
	    }, 800, function() {
	    	// window.location.hash = href;
	    });
		});

	};

	onePageClick();
	

	var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:false,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-md-arrow-back'></span>","<span class='ion-chevron-right'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});
	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// Initialize scrollspy with responsive offset
	var initScrollspy = function() {
		var offset = $(window).width() < 768 ? 100 : ($(window).width() < 992 ? 150 : 300); // Responsive offset
		$('body').scrollspy({
			target: '.site-navbar-target',
			offset: offset
		});
	};
	initScrollspy();

	// Reinitialize scrollspy on window resize
	$(window).resize(function() {
		initScrollspy();
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');
					$('body').scrollspy('refresh'); // Refresh scrollspy when navbar changes
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
					$('body').scrollspy('refresh'); // Refresh scrollspy when navbar changes
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	

	var counter = function() {
		
		// Use Intersection Observer for better performance and re-triggering
		const counterSection = document.getElementById('section-counter');
		const counters = document.querySelectorAll('#section-counter .number');
		
		if (!counterSection || !counters.length) return;
		
		let isAnimating = false;
		
		// Function to animate a single counter
		function animateCounter(counter, targetValue) {
			const startValue = 0;
			const duration = 2000; // 2 seconds
			const startTime = performance.now();
			
			function updateCounter(currentTime) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				
				// Easing function for smooth animation
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
				
				counter.textContent = currentValue.toLocaleString();
				
				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				}
			}
			
			requestAnimationFrame(updateCounter);
		}
		
		// Function to start all counter animations
		function startCounterAnimation() {
			if (isAnimating) return;
			isAnimating = true;
			
			counters.forEach(counter => {
				const targetValue = parseInt(counter.getAttribute('data-number')) || 0;
				counter.textContent = '0';
				animateCounter(counter, targetValue);
			});
			
			// Reset animation flag after completion
			setTimeout(() => {
				isAnimating = false;
			}, 2500);
		}
		
		// Function to reset counters
		function resetCounters() {
			counters.forEach(counter => {
				counter.textContent = '0';
			});
			isAnimating = false;
		}
		
		// Create Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Section is in view, start animation
					startCounterAnimation();
				} else {
					// Section is out of view, reset counters
					resetCounters();
				}
			});
		}, {
			threshold: 0.3, // Trigger when 30% of the section is visible
			rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully out of view
		});
		
		// Start observing the counter section
		observer.observe(counterSection);
		
	}
	counter();

	var aboutCounter = function() {
		// Counter for About section Projects Completed
		const aboutSection = document.getElementById('about-section');
		const aboutCounterElement = document.querySelector('#about-section .number');

		if (!aboutSection || !aboutCounterElement) return;

		let isAnimating = false;

		// Function to animate the counter
		function animateCounter(targetValue) {
			const startValue = 0;
			const duration = 1500; // 1.5 seconds
			const startTime = performance.now();

			function updateCounter(currentTime) {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Easing function for smooth animation
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

				aboutCounterElement.textContent = currentValue;

				if (progress < 1) {
					requestAnimationFrame(updateCounter);
				}
			}

			requestAnimationFrame(updateCounter);
		}

		// Function to start animation
		function startAnimation() {
			if (isAnimating) return;
			isAnimating = true;

			const targetValue = parseInt(aboutCounterElement.getAttribute('data-number')) || 0;
			aboutCounterElement.textContent = '0';
			animateCounter(targetValue);

			// Reset animation flag after completion
			setTimeout(() => {
				isAnimating = false;
			}, 1600);
		}

		// Function to reset counter
		function resetCounter() {
			aboutCounterElement.textContent = '0';
			isAnimating = false;
		}

		// Create Intersection Observer
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					// Section is in view, start animation
					startAnimation();
				} else {
					// Section is out of view, reset counter
					resetCounter();
				}
			});
		}, {
			threshold: 0.3, // Trigger when 30% of the section is visible
			rootMargin: '0px 0px -50px 0px'
		});

		// Start observing the about section
		observer.observe(aboutSection);
	}
	aboutCounter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

	// Navbar scroll effect
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > 100) {
			$('#ftco-navbar').addClass('scrolled');
		} else {
			$('#ftco-navbar').removeClass('scrolled');
		}
	});

})(jQuery);

