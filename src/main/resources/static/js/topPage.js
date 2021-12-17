

$(function() {
	
	// 読み込み時にPostの高さを決定する
	$(document).ready(function() {
		decide_topics_width();
	});
	
	$(window).on('resize', function() {
		decide_topics_width();
	});
	
	$('.fa-bars').on("click", function() {
		decide_topics_width();
	});
	
	$('.fa-times').on("click", function() {
		$('.page-header').innerWidth($(window).width());
	});
	
	//　Postの高さを決定する
	function decide_topics_width(){
		var $window = $(window).width();
		var header_width = $window - $('#sidebar').outerWidth(true);
		$('.page-header').innerWidth(header_width);
	}
})


$(function() {
	
	const $body = $("body");
	const $main = $(".page-content");
	const $header = $(".page-header");
	const $navCollapse = $(".navbar-collapse");
	const scrollClass = "scroll";

	console.log('start');
	
	$('.page-content').on("scroll", () => {
		
		
			const scrollY = $(this).scrollTop();
			if(scrollY > 0){
				$main.addClass(scrollClass);
			} else {
				$main.removeClass(scrollClass);
			}
			
				/**
			scrollY > 0
				? $main.removeClass(scrollClass)
				: $main.addClass(scrollClass);
				
		if (this.matchMedia("(min-width: 992px)").matches) {
			const scrollY = $(this).scrollTop();
			scrollY > 0
				? $main.removeClass(scrollClass)
				: $main.addClass(scrollClass);
		} else {
			$main.removeClass(scrollClass);
		}

				? $header.css('background','none')
				: $header.css('background','var(--red)');
				
				? $header.removeClass(scrollClass)
				: $header.addClass(scrollClass);
				
				 */
	});
	
	$(".page-header .nav-link, .navbar-brand").on("click", function(e) {
		// e.preventDefault();
		const href = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(href).offset().top - 71
		}, 600);
	});
	
});



$(function() {
	$(".flip-container:not(.active)").on("click", function(e) {
		
		$(this).addClass("active"), setTimeout(function() {
			$(".lightbox").addClass("active");
		}, 500);
		
	}),
	
		$(".lightbox").on("click", function() {
			
			$(".flip-container.temp").after(
				$(".flip-container.active")
			),
			setTimeout(function() {
				$(".active").removeClass(
					"active"
				), $(".flip-container.temp").remove();
			});
			
		});
});
