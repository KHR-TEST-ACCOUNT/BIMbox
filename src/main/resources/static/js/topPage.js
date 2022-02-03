
$(function() {
	
	// 読み込み時処理
	$(document).ready(function() {
		decide_topics_width();
	});
	
	// 画面リサイズ時処理
	$(window).on('resize', function() {
		decide_topics_width();
	});
	
	// メニューバーを開いたときの処理
	$('.fa-bars').on("click", function() {
		decide_topics_width();
	});
	
	// メニューバーを閉じたときの処理
	$('.fa-times').on("click", function() {
		$('.page-header').innerWidth($(window).width());
	});
	
	// ページ内リンクのスクロール処理
	$('a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		var top = $(href).offset().top;
		var topAdd = $('.page-content').scrollTop();
		$('.page-content').animate({
			scrollTop: top + topAdd - 58
		}, 500, 'linear');
	});
	
	// 各要素の横幅を動的に決定	
	function decide_topics_width() {
		//　ヘッダーの横幅を決定する
		var $window = $(window).width();
		var header_width = $window - $('#sidebar').outerWidth(true);
		if ($window < 768) {
			header_width = $window;
		}
		$('.page-header').innerWidth(header_width);
		
		// detailsのIMGの横幅を設定
		var element = $('#details')
		var element_width = element.innerWidth();
		var functionImgs = element.find('.function-content');
		
		if (element_width < 840) {
			functionImgs.each(function() {
				$(this).css('max-width', '100%');
			});
		} else {
			functionImgs.each(function() {
				$(this).css('max-width', '50%');
			});
		}
		
		// pickUpのIMGの横幅を設定
		element = $('#pickUp')
		var element_width = element.innerWidth();
		var functionImgs = element.find('.function-content');
		// 要素の順番
		var orderCount = 1;
		if (element_width < 790) {
			// 画面縮小時
			functionImgs.each(function() {
				$(this).css('max-width', '100%');
				$(this).find('.orderImgContent').css('max-width', '60%');
				// 文章を先に表示
				if($(this).hasClass('order-content')) {
					$(this).css('order', orderCount - 3);
				} else {
					$(this).css('order', orderCount);
				}
				orderCount += 2;
			});
		} else {
			// 画面拡大時
			functionImgs.each(function() {
				$(this).css('max-width', '50%');
				$(this).find('.orderImgContent').css('max-width', '100%');
				$(this).css('order', orderCount);
				orderCount += 2;
			});
		}
	}
})


// ヘッダーの動的処理
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


// Detailsのカードフリップ処理
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
	})
});
