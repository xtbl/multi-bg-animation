/**
 * 
 * Super Awesome Space Story 
 * by Cristobal Avila
 * 
 */

//teletype script
$.fn.teletype = function(opts){
    var $this = this,
        defaults = {
            animDelay: 50
        },
        settings = $.extend(defaults, opts);
    
    $.each(settings.text.split(''), function(i, letter){
        setTimeout(function(){
            $this.html($this.html() + letter);
        }, settings.animDelay * i);
    });
};



var CRISTOBAL = CRISTOBAL || {};

CRISTOBAL.spaceship = (function ($) {

	//private
	var multiplier = 0.5,
		target_difference = 800,
		target_base = 3000,
		currentMessage = 0,
		clickNumber = 0

		config = {
			spaceShipContainer: $("#main-spaceship"),
			sceneContainer: $('.multiback'),
			messageBox: $('#animatedback p'),
			messageSpeed: 20
		},

		spaceshipMessages = [
			'Enjoying the view?',
			'If you click on the spaceship, it will go faster.',
			'But please, be careful, the new experimental fusion engine is really powerful.',
			'Warning. This is extremely dangerous.',
			'D A N G E R ! ! !',
			'Goodbye hero.',
			'This space adventure was brought to you by: Cristobal.',
			'Don\'t worry, the pilot is ok... he just went to... another dimension :D'
		],

		start_animation = function () {
			var func_el = set_animation();
			func_el.addEventListener('transitionend', reset_animation, true);
			func_el.addEventListener('webkitTransitionEnd', reset_animation, true);
		},

		set_animation = function () {
			var el = document.querySelector('div.multiback');
			el.className = 'multiback multibackprocess';
			console.log('set animation');
			return el;
		},

		reset_animation = function () {
			multiplier++;
			var el = document.querySelector('div.multiback');
			el.style.backgroundPosition = '-'+((target_base + target_difference*3)*multiplier)+'px 0, -'+((target_base + target_difference*2)*multiplier)+'px 0, -'+((target_base + target_difference)*multiplier)+'px 0, -'+(target_base*multiplier)+'px 0';
			console.log('animation reset');
		},

		lightingSpace = function ( bgElem ) {
			var bgElement = $(bgElem);
			bgElement.css('background-image','none');
			lightingSpaceInterval = setInterval(function() {
				if( bgElement.hasClass('dark') ){
					bgElement.removeClass('dark');
					bgElement.addClass('bright');
				}
				else{
					bgElement.removeClass('bright');
					bgElement.addClass('dark');
				}
			} ,10 );
			$('#main-spaceship img').fadeOut(5000,function() {
				config.messageBox.removeClass('warning-text');
				config.messageBox.addClass('console-text');
				displayMessages( 6 );
				msgTimeout = setTimeout(function() {
					displayMessages( 7 );
					clearInterval(lightingSpaceInterval);
					bgElement.addClass('dark');
				},3000);
			});
		},

		displayDangerMsg = function ( msgContainer ) {
			$(msgContainer).fadeIn(3000);
		},

		displayMessages = function ( msgNum ) {
			if( msgNum <= spaceshipMessages.length ){
				config.messageBox.text('');
				config.messageBox.teletype({
					animDelay: config.messageSpeed,
					text: spaceshipMessages[ msgNum-1 ]
				});
			}else{
				console.log('message num is bigger than spaceshipMessages.length');
			}
		},
		accelerationActions = function () {
			multiplier *= 1.2; 
			clickNumber += 1;
			console.log('multiplier: ' + multiplier);
			console.log('clickNumber: ' + clickNumber);
			
			reset_animation();
			
			// acceleration events
			if (clickNumber == 1) {
				displayMessages( 1 );
			};
			// msg: if you click...
			if (clickNumber == 2) {
				displayMessages( 2 );
			};
			// msg: be careful
			if (multiplier > 6 && multiplier < 7) { 
				displayMessages( 3 );
			};			
			// msg: warning this is extremely...
			if (multiplier > 21 && multiplier < 28) { 
				config.messageBox.removeClass('console-text');
				config.messageBox.addClass('warning-text');
				displayMessages( 4 );
			};
			// high speed with stars background
			// msg: warning this is dangerous
			if (multiplier > 27 && multiplier < 35) {
				$('.multiback').css('background-image','url(images/stars_01.gif)');
				displayMessages( 5 );
			};
			// msg: goodbye hero in fadeout callback
			// lighting speed stroboscopic bg, hero disappears
			if (multiplier > 42) {
				lightingSpace('.multiback');
			};
		},

		bindUIActions = $('#main-spaceship').click(function() {
			console.log('spaceship click');
			accelerationActions();
		}),

		init = function() {
			start_animation();
			reset_animation();
		};

		// public API
		return {
			init: init
		};

}(jQuery));

CRISTOBAL.spaceship.init();

