

$(function() {
	
	// 読み込み時にヘッダーの横幅を決定する
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
	
	//　ヘッダーの横幅を決定する
	function decide_topics_width() {
		var $window = $(window).width();
		var header_width = $window - $('#sidebar').outerWidth(true);
		if ($window < 768) header_width = $window;
		$('.page-header').innerWidth(header_width);
	}
})


$(function() {
	
	const $main = $(".page-content");
	const scrollClass = "scroll";
	
	$('.page-content').on("scroll", function() {
		const scrollY = $(this).scrollTop();
	    scrollY > 7
	      ? $main.addClass(scrollClass)
	      : $main.removeClass(scrollClass);
	});
});


// Scroll　Function
$(function() {
	$(".page-header .nav-link, .navbar-brand").on("click", function(e) {
		e.preventDefault();
		const href = $(this).attr("href");
		console.log($('.page-content').scrollTop());
		$(".page-content").animate({
			scrollTop: $(href).offset().top - 58
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
