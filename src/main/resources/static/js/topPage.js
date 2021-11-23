
/** smooth-scroll

var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 10,
	easing: 'easeInOutCubic',
	header: '[data-scroll-header]',
	offset: 56
});


$(function() {

	$('.slider').slick({
	    autoplay:true,
	    autoplaySpeed:3000,
	    dots:true
	});

});
 */




$(document).ready(function() {

	$('#pagepiling').pagepiling({
		onLeave: function(index, nextIndex, direction) {
			//after leaving section 2
			if (direction == 'down') {
				damn(true)
			}
			else if (direction == 'up') {
				damn(false)
			}
		}
	});


	$("*[data-bg]").each(function() {
		color = $(this).attr("data-bg")
		$(this).css("color", "white")//"light"+color)
	})
	
	i = 0
	colors = ["lightblue", "lightseagreen","lightcoral", "lightgreen"]

	function damn(next) {
		if (next) { i++; } else { i--; }
		$("html, body").css("background-color", colors[i - 1])
		//$(".section.active").css("background-color", colors[i-1])
	}

	damn(true)
});



	

