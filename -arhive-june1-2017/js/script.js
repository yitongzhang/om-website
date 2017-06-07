$(document).ready(function() {
	var $body = $('body');
	var $window = $(window);
	var started = true;
	var pageTitles = {
		"3": "Google",
		"4": "Facebook",
		"5": "Gmail",
		"6": "Crew",
	}
	var isMobile = false;
	var progressBar;
	var caseStudyClient = '';

	// --- debounce functions ---
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	// --- activate full page ---
	function onLeaveSection(index, nextIndex, direction){ 
		// --- body class ---
		var current = nextIndex - 1;
		var isWhite = $('.section:eq('+current+')').hasClass('white-text');
		if (isWhite){
			$('body').addClass('white-text');
		} else {
			$('body').removeClass('white-text');
		}

		// --- underline work menu item when in the work sections
		var isWorkSlide = $('.section:eq('+current+')').hasClass('section-case-study');
		if ( isWorkSlide ){
			$('.menu-work').addClass('active');
		} else {
			$('.menu-work').removeClass('active');
		}

		var isAboutSlide = $('.section:eq('+current+')').hasClass('section-about');
		isAboutSlide ? $('.menu-about').addClass('active') : $('.menu-about').removeClass('active');


		// get case study
		if ( pageTitles[nextIndex] ){
			caseStudyClient = pageTitles[nextIndex];
			$('.cs-subnav.case-study .client').text(caseStudyClient);
		}
	}

	function onAfterLoad(anchor, index){
		var workSlide = [3,4,5,6];
		var jobIndex = 8;

		// leave job while viewing
		if ( index == jobIndex && $('body').hasClass('view-job-screen') ){
			closeSecondScreen();
		} else if ( workSlide.indexOf(index) == -1 && $('body').hasClass('viewing-case-study') ){
			closeSecondScreen();
		}
		// ---- menu home
		index == 1 ? $('.menu-home').addClass('active') : $('.menu-home').removeClass('active');
		
		// progress bar
		progressBar.onFullpageLoad(index);
	}


	// ---- tween - animation ---- //
	function Animation(){
		var A = this;

		var duration = 0.5;
		var attMobileMenuOpen = { opacity: 1, visibility: 'visible' };
		var attMobileMenuClose = { opacity: 0, visibility: 'hidden' };
		var attHamburgerActive = { y: '0%' };
		var attHambugerInactive = { y: '-100%' };
		var subNavOpened = [{ x: '3%', delay: 0.8 }, {x: '0%'}];
		var subNavClosed = { x: '-101%' };

		var $mobileMenu = $('.mobile-menu-container');
		var $logo = $('.logo');

		var timeline = new TimelineLite();

		function extend( attr, options ){
			return $.extend( attr, options );
		}
		function ease( attr, easeOption){
			return extend( attr, {ease: easeOption} );
		}

		function toggleMenuClass(){
			$body.toggleClass('menu-on');
		}

		A.openMobileMenu = function(){
			toggleMenuClass();
		}
		A.closeMobileMenu = function(){
			toggleMenuClass();
		}

		A.openSubNavCaseStudy = function(){
			TweenLite.killTweensOf( $('.cs-subnav.case-study') );
			TweenLite.killTweensOf( $('.logo .back span') );
			timeline.to( $('.cs-subnav.case-study'), 0.3, subNavOpened[0] )
				.to( $('.cs-subnav.case-study'), 0.2, subNavOpened[1] );
		}

		A.openSubNavJob = function(){
			TweenLite.killTweensOf( $('.cs-subnav.case-study') );
			TweenLite.killTweensOf( $('.logo .back span') );
			timeline.to( $('.cs-subnav.job'), 0.3, subNavOpened[0] )
				.to( $('.cs-subnav.job'), 0.2, subNavOpened[1] );
		}

		A.closeSubNav = function(){
			TweenLite.killTweensOf( $('.cs-subnav.case-study') );
			TweenLite.killTweensOf( $('.logo .back span') );
			TweenLite.to( $('.cs-subnav.case-study'), 0.5, subNavClosed );
			TweenLite.to( $('.cs-subnav.job'), 0.5, subNavClosed );
		}
		return this;
	}
	var yc_animate = new Animation();

	// cta button
	$('.cta-button').each(function(){
		var $element = $(this);
		var $hover = $element.find('.hovered');
		var $overlay = $element.find('.overlay');

		$element.on('mouseover, touchstart', function(){
			var size = $element.outerWidth();
			$hover.css('width', size);
		});
	});

	// ---- Utilities ----//
	function onCaseStudyScrolling(index, nextIndex, element) {
		var section = $(element).parents('.section-case-study');

		if ( section.hasClass('case-study-facebook') ){
			var nav = $(element).find('.cs-nav');
			if ( nextIndex == 2 ){
				nav.addClass('fb');
			} else {
				nav.removeClass('fb');
			}
		}
	}

	// -------------- screen ------------- //
	function initCaseStudy(){
		var lastHash = '';

		var activateCaseStudy = function(name){
			var target = $('.case-study-' + name);

			target.css({top: '100%', left: '0%'});
			target.addClass('active');
			target.siblings().removeClass('active');
			$('#header').css('position', 'fixed');
			$('#screen-two').css('display', 'block');
			target.scrollTop(0); // reset scroll

			// set url
			lastHash = name;
			location.hash = "case-study-" + name;

			TweenLite.to(target, 0.5, { top: '0%' });

			$.fn.fullpage.setAllowScrolling(false);
			$('body').addClass('screen-two-active');
			$('body').trigger('onOpenCaseStudy');
		}

		var deactivateCaseStudy = function(silent){
			var silent = silent || false;
			var target = $('.case-study.active')
			$('.case-study').removeClass('active');
			$.fn.fullpage.setAllowScrolling(true);
			$('#header').css('position', 'absolute');

			// lastHash = location.hash;
			if ( !silent ){
				location.hash = lastHash;
			}	

			TweenLite.to(target, 0.5, { top: "100%" });
			$('body').removeClass('screen-two-active');	

			setTimeout(function() {
				$('#screen-two').css('display', 'none');
			}, 500);

			setTimeout( function(){
				$('body').trigger('onCloseCaseStudy');
				$.fn.fullpage.reBuild();
			}, 500 );
		}

		var activateModal = function(name){
			var target = $('#' + name);
			
			$('body').addClass('block-scroll');
			$('.modal').removeClass('active');
			target.css({
				left: '100%', top: 0
			});
			target.addClass('active');
			TweenLite.to(target, 0.5, { left: 0 });
			setTimeout( function(){
				$(target).find('input:first').focus();
			}, 500 );
		}

		var deactivateModal = function(){
			var target = $('.modal.active');
			target.css({
				left: '0%'
			});
			TweenLite.to(target, 0.5, { left: '100%' });
			setTimeout(function(){
				$('body').removeClass('block-scroll');
				target.removeClass('active');	
			}, 500);
		}

		var moveSlideNext = function(name){
			var current = $('.case-study.active');
			var next = $('.case-study-' + name);
			next.css({
				left: '100%',
				top: "0%",
				opacity: 1,
				visibility: 'visible'
			}).addClass('active');
			next.scrollTop(0); // reset scroll

			// hash
			var hash = 'case-study-' + name;
			location.hash = hash;
			lastHash = hash;

			TweenLite.to(current, 0.5, { left: "-100%", ease: Power0.easeNone });
			TweenLite.to(next, 0.5, { left: "0%", ease: Power0.easeNone });

			setTimeout(function() {
				current.removeClass('active');
			}, 500);
		}

		var moveSlidePrev = function(name){
			var current = $('.case-study.active');
			var next = $('.case-study-' + name);
			next.css({
				left: '-100%',
				top: "0%",
				opacity: 1,
				visibility: 'visible'
			}).addClass('active');
			next.scrollTop(0); // reset scroll

			var hash = 'case-study-' + name;
			location.hash = hash;
			lastHash = hash;

			TweenLite.to(current, 0.5, { left: "100%", ease: Power0.easeNone });
			TweenLite.to(next, 0.5, { left: "0%", ease: Power0.easeNone });

			setTimeout(function() {
				current.removeClass('active');
				// current.css({'opacity': 0, 'visibility': 'hidden'});
			}, 500);
		}

		var moveToHash = function(){
			var hash = window.location.hash.substring(1);;
			var name = '';

			if ( new RegExp(/case-study-(\w+)/).test(hash) ){
				name = hash.replace(/case-study-(\w+)/, '$1');
				$.fn.fullpage.moveTo( name );

				window.location.hash = hash;
				activateCaseStudy( name );
			}
		}

		$('.toggle-cs').on('click', function(e){
			e.preventDefault();
			var cs = $(this).data('cs');
			activateCaseStudy(cs);
		});

		$('.close-screen-two').on('click', function(e){
			e.preventDefault();
			deactivateCaseStudy();
		});

		$('.btn-contact').on('click', function(e){
			e.preventDefault();
			activateModal('modalContact');
		});
		$('.modal .close').on('click', function(e){
			e.preventDefault();
			deactivateModal();
		});

		$('.case-study-nav.next').on('click', function(e){
			e.preventDefault();
			var name = $(this).data('cs');
			moveSlideNext( name );
		});
		$('.case-study-nav.prev').on('click', function(e){
			e.preventDefault();
			var name = $(this).data('cs');
			moveSlidePrev( name );
		});
		$('.menu-home').on('click', function(e){
			if ( $('body').hasClass('screen-two-active') ){
				e.preventDefault();
				$.fn.fullpage.silentMoveTo(1);
				deactivateCaseStudy(true);

				return false;
			}
			
		});

		$('.case-study').each(function(){
			var $cs = $(this);
			var sections = $cs.find('section');
			var nav = $cs.find('.navigator');

			if (nav.length == 0) return;

			var refresh = function(){
				var pos = ($(window).height() / 2);

				sections.each(function(index){
					var section = $(this);
					var sectionTop = section.position().top;
					var sectionBottom = section.position().top + section.height();
					var isLightBackground = section.hasClass('background-light');

					if ( pos >= sectionTop && pos < sectionBottom ){
						if ( isLightBackground ){
							nav.addClass('dark');
						} else {
							nav.removeClass('dark');
						}
					}
				});
			}

			$cs.on('scroll', function(){
				refresh();
			});
		});

		$('body').on('keyup', function(event){
			if ( $('#modalContact').hasClass('active') && event.which == 27 ){
				deactivateModal();
			}
		});

		var formInit = function(form){
			$(form).each(function(){
				var form = $(this);
				var fields = form.find('input,textarea,select');
				var errorDiv = form.find('.form-error-message');
				var setErrorMessage = function(text){
					errorDiv.text( text );
					errorDiv.addClass('active');
				}
				var hideErrorMessage = function(){
					errorDiv.text('');
					errorDiv.removeClass('active');
				}
				var clearFields = function(){
					form.find('input[type=text],input[type=email],select,textarea').each(function(){
						$(this).val('');
					});
				}

				var validate = function(){
					var result = 'ok';
					var emailExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
					// empty
					fields.each(function(){
						var field = $(this);
						var name = field.attr('name');
						if ( field.val() == '' ){
							field.addClass('error');
							result = ' Please input required fields!';
						} else {
							field.removeClass('error');
						}
					});

					fields.each(function(){
						var field = $(this);
						var name = field.attr('name');
						if ( field.attr('type') == 'email' && !emailExp.test(field.val())){
							result = 'Please input valid email!';	
							field.addClass('error');
							return false;
						} else if (field.attr('type') == 'email' && emailExp.test(field.val())) {
							field.removeClass('error');
						}
					});

					return result;
				}

				fields.on('blur', function(){
					if ( $(this).val() != '' && $(this).attr('type') != 'email' ){
						$(this).removeClass('error');
					}
				});

				form.find('input[type=email]').on('blur', function(){
					var field = $(this);
					var emailExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
					if ( field.val() != '' && !emailExp.test(field.val())){
						setErrorMessage('Please input valid email!');
						field.addClass('error');
					} else if (emailExp.test(field.val())) {
						field.removeClass('error');
						hideErrorMessage();
					}
				});

				form.on('submit', function(event){
					event.preventDefault();
					var fields = {};
					var form = $(this);
					var messageModal = new Modal('#modalMessage');
					var messageError = form.find('.form-error-message');

					// send reques
					var validateResult = validate();

					if ( validateResult == 'ok' ){
						// collect data and validate
						form.find('input,select,textarea').each(function(){
							var name = $(this).attr('name');
							var value = $(this).val();

							fields[name] = value;
						});

						$.ajax({
							url: '/contact.php',
							// url: 'http://yc.localhost/contact.php',
							type: 'post',
							data: fields,
							crossDomain: true,
							beforeSend: function(){
								messageError.removeClass('active');
							},
							success: function(resp){
								if ( resp.success ){
									messageModal.open();
									//clear
									clearFields();
								} else {
									setErrorMessage("Hmm, something went wrong. Please try again.");
								}
							}
						});
					} else {
						setErrorMessage(validateResult);
					}
				});
			});
		}

		formInit('.contact-form');

		moveToHash();

		//textarea
		$('textarea').autogrow({vertical: true, horizontal: false});
	}

	var Modal = function(element){
		var instance = this;
		var closeCallback = function(){};
		this.element = $(element);
		this.open = function(){
			instance.element.css({
				"display": 'block',
				"opacity": 0,
				"visibility": 'hidden',
				"top": 0,
				"left": 0
			})
			instance.element.addClass('active');

			TweenLite.to(instance.element, 0.5, {
				opacity: 1,
				visibility: "visible"
			})
		}
		this.close = function(){
			TweenLite.to(instance.element, 0.5, {
				opacity: 0
			});
			setTimeout( function(){
				instance.element.removeClass('active');
				instance.element.css({
					visibility: "hidden",
					display: "block"
				})
			}, 500)
		}
		this.registerCloseCallback = function(callback){
			closeCallback = callback;
		}

		this.element.find('.close-modal').on('click', function(){
			instance.close();
		});

		return this;
	}

	var ProgressBar = function(){
		var $this = this;
		this.element = $('<div class="progress-bar">');
		this.reloadProgress = function(animate){
			var progress = $this.calculateProgress();
			var animate = animate || true;

			if ( animate ){
				TweenLite.to( $this.element, 0.3, {width: progress + '%'} );
			} else {
				$this.element.css('width', progress + '%');
			}
		}

		this.onFullpageLoad = function(index){
			var total = $('#fullpage > div').length;
			var progress = (index - 1) / (total - 1) * 100;
			TweenLite.to( $this.element, 0.3, {width: progress + '%'} );
			if ( index == 6 ){
				$this.element.addClass('white');
			} else {
				$this.element.removeClass('white');
			}
		}

		this.calculateProgress = function(){
			var progress = 0;
			if ( $('body').hasClass('screen-two-active') ){
				var container = $('#screen-two .case-study.active')
				var wrapper = container.find('.wrapper');
				progress = container.scrollTop() / (wrapper.outerHeight() - $(window).height()) * 100;
			} else {
				if ( isMobile ){
					progress = $('body').scrollTop() / ($('body').height() - $(window).height()) * 100;
				} else {
					var string = $('#fullpage').css('transform');
					var matrix = string.match(/-?[\d\.]+/g);
					var pos = Math.abs(matrix[5]) / $(window).height();
					progress = pos / ($('#fullpage .section').length - 1) * 100;
				}
			}

			return progress;
		}

		var init = function(){
			// attach element
			$('body').append($this.element);
			$this.element.css({
				'position': 'fixed',
				'top': "0",
				'left': "0",
				'width': '0%',
				'z-index': '100'
			});

			setTimeout($this.reloadProgress, 100);

			window.addEventListener('scroll', function(e) {
				$this.reloadProgress();
				if ( !$body.hasClass('screen-two-active') ){
					var position = $('body').scrollTop();
					var limit = $('#fullpage .section.section-quote').offset().top;

					if (position >= limit && !$this.element.hasClass('white') ){
						$this.element.addClass('white');
					} else if (position < limit && $this.element.hasClass('white')) {
						$this.element.removeClass('white');
					}
				} 
			});

			$('#screen-two .case-study').on('scroll', function(){
				$this.reloadProgress();
			});
			
			$('body').on('onOpenCaseStudy', function(event){
				$this.reloadProgress();
			});
			$('body').on('onCloseCaseStudy', function(event){
				$this.reloadProgress();
			});
		}

		init();


		return this;
	}

	// ----------------- initialize --------------------//
	var caseStudySlides = [];
	var screenJob = null;
	var touching = null;
	function init(){
		this.main = $('#fullpage');
		progressBar = new ProgressBar();
		var openedCaseStudy;
		var self = this;

		// ---- detect touch event ---- //
		if (Modernizr.touchevents){
			$body.addClass('is-touch');
		}
		$('body').removeClass('not-ready');

		$('#fullpage').fullpage({
			anchors: ['home', 'process', 'google', 'facebook', 'gmail', 'crew', 'about'],
			// sectionsColor: ['#111', '#ff0078', '#fff', '#0085d2', '#111', '#111'],
			css3: true,
			fitToSectionDelay: 50,
			responsiveWidth: 780,
			// responsiveWidth: 900,
			onLeave: onLeaveSection, // function(index, nextIndex, direction){},
			afterLoad: onAfterLoad,
			afterRender: function(){
				$('body').removeClass('not-ready');
			}
		});

		var lastWidowWidth = null;
		var onWindowResize = debounce(function(){
			windowWidth = $(window).width();
			if ( windowWidth > 768 && lastWidowWidth <= 768 ){
				deactivateMobileMode();
			} else if (windowWidth <= 768 && (lastWidowWidth == null || lastWidowWidth > 768 ) ) {
				activateMobileMode();
			}
			lastWidowWidth = windowWidth;

			isMobile = $(window).width() <= 768;
		}, 50);
		isMobile = $(window).width() <= 768;

		$(window).resize(onWindowResize);
		setTimeout( onWindowResize, 100 ); // call first time

		// ---- auto fit to section when stop scrolling ---- //
		if ( Modernizr.touchevents ){
			$(window).on('touchstart', function(){
				TweenLite.killTweensOf($body);
			});
		}

		// --- adjust case study height for vertical centerization ----- //
		var adjustCaseStudySize = function(){
			if ( $(window).width() <= 768 ) return;
			$('.work-template-home .container').each(function(){
				var $info = $(this).find('.info');
				$info.css('height', 'auto');
				$info.css('height', $(this).height());
			});
		};
		$(window).on('resize', debounce(adjustCaseStudySize, 1));
		setTimeout(adjustCaseStudySize, 1);

		// case study
		initCaseStudy();

		// 
		$('.section-bg').each(function(){
			var $this = $(this);
			var bg = $this.find('.bg')
			TweenLite.to(bg, 1, {opacity: 1, delay: 0.1});
		});
		
	}

	function activateMobileMode(){
		$.fn.fullpage.setFitToSection(false);
		$.fn.fullpage.setScrollingSpeed(0);
	}
	function deactivateMobileMode(){
		$.fn.fullpage.setFitToSection(true);
		$.fn.fullpage.setScrollingSpeed(700);
	}

	// ---- init ----/
	init();
});