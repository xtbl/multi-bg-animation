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

		config = {
			spaceShipContainer: $("#main-spaceship"),
			sceneContainer: $('.multiback'),
			messageBox: $('#animatedback p')
		},

		spaceshipMessages = [
			'Enjoying the view?',
			'If you click on the spaceship, it will go faster.',
			'But please, be careful, this new experimental fusion engine is very powerful.',
			'Warning. This is extremely dangerous.',
			':\'(', //&quot;
			'Goodbye hero.',
			'Don\'t worry, the pilot is ok.',
			'This space adventure was brought to you by: Cristobal Avila'
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
			setInterval(function() {
				if( bgElement.hasClass('dark') ){
					bgElement.removeClass('dark');
					bgElement.addClass('bright');
				}
				else{
					bgElement.removeClass('bright');
					bgElement.addClass('dark');
				}
			} ,10 );
			$('#main-spaceship img').fadeOut(5000);
		},

		displayDangerMsg = function ( msgContainer ) {
			$(msgContainer).fadeIn(3000);
		},

		displayMessages = function () {
		//http://stackoverflow.com/questions/4074399/what-to-choose-for-typewriter-effect-in-javascript
		//http://jsbin.com/araget/5/edit
		//http://www.thepixelart.com/create-a-typing-text-effect-using-jquery/
		//http://stackoverflow.com/questions/13325008/typewriter-effect-with-jquery
			config.messageBox.text('');
			config.messageBox.teletype({
				animDelay: 100,
				text: spaceshipMessages[currentMessage]
			});
			currentMessage+=1;
		},
		accelerationActions = function () {
			multiplier *= 1.5; 
			console.log('multiplier is:' + multiplier);
			displayMessages();
			reset_animation();
			if (multiplier > 15) { 
				displayDangerMsg('.danger'); 
			};
			if (multiplier > 30) {
				$('.multiback').css('background-image','url(http://localhost:9000/images/stars_01.gif)');
			};
			if (multiplier > 60) {
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
			init: init,
			config: config
		};

}(jQuery));

CRISTOBAL.spaceship.init();

