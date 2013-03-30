/**
 * 
 * Super Awesome Space Story 
 * by Cristobal Avila
 * 
 */

// CRISTOBAL.namespace('CRISTOBAL.spaceship');

// CRISTOBAL.spaceship = (function (){
// 	console.log('test');
// }());

var multiplier = 0.5;
var target_difference = 800;
var target_base = 3000;

function start_animation() {
	var func_el = set_animation();
	func_el.addEventListener('transitionend', reset_animation, true);
	func_el.addEventListener('webkitTransitionEnd', reset_animation, true);
}

function set_animation() {
	var el = document.querySelector('div.multiback');
	el.className = 'multiback multibackprocess';
	console.log('set animation');
	return el;
}

function reset_animation() {
	multiplier++;
	var el = document.querySelector('div.multiback');
	el.style.backgroundPosition = '-'+((target_base + target_difference*3)*multiplier)+'px 0, -'+((target_base + target_difference*2)*multiplier)+'px 0, -'+((target_base + target_difference)*multiplier)+'px 0, -'+(target_base*multiplier)+'px 0';
	console.log('animation reset');
}

function displayMessage( msgContainer ) {
	$(msgContainer).fadeIn(3000);
}

function lightingSpace( bgElem ) {
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
}

function displayMessages() {
//http://www.thepixelart.com/create-a-typing-text-effect-using-jquery/
//http://stackoverflow.com/questions/13325008/typewriter-effect-with-jquery


}

$('#main-spaceship').click(function() {
	console.log('spaceship click');
	multiplier *= 1.5; 
	console.log('multiplier is:' + multiplier);
	reset_animation();
	if (multiplier > 15) { 
		displayMessage('.danger'); 
	};
	if (multiplier > 30) {
		$('.multiback').css('background-image','url(http://localhost:9000/images/stars_01.gif)');
	};
	if (multiplier > 40) {
		lightingSpace('.multiback');
	};

});

start_animation();
reset_animation();