$(function() {
	
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		toggled_userList();
		deside_img_width();
		inLinefeed($(".topics"));
		$("#loading").delay(1500).fadeOut('slow');
		$("#loading_box").delay(1200).fadeOut('slow');
		/**
		 */
	});
	
	$(window).on('resize', function() {
		deside_img_width();
		inLinefeed($(".topics"));
	});
	
	// responsive card topics
	function inLinefeed(element) {
		var element_width = element.innerWidth();
		var user_card = element.find('.user-card');
		
		if (642 <= element_width && element_width < 956) {
			user_card.each(function() {
				$(this).css('width', '33.333%');
			});
		} else if (397 <= element_width && element_width < 642) {
			user_card.each(function() {
				$(this).css('width', '50%');
			});
		} else if (element_width < 397) {
			user_card.each(function() {
				$(this).css('width', '100%');
			});
		} else {
			user_card.each(function() {
				$(this).css('width', '25%');
			});
		}
	}
	
	// 表示非表示を設定
	function toggled_userList() {
		var windowSize = $(window).width();
		if (windowSize < 1300) {
			$(".page-wrapper").removeClass("toggled");
		}
		if (windowSize >= 1300) {
			$(".page-wrapper").addClass("toggled");
		}
	}
	
	// card-imgの横幅を設定
	function deside_img_width(){
		var width = $('.card-content').width() - 3;
		$('.card-image').css('max-width', width);
	}
	
	//マウスカーソルが重なった時の処理
	$('.zooming').hover(function() {
			var img = $(this).children('img');
			var img_height = ($(this).innerHeight() - img.innerHeight()) / 2;
			img.css('top', img_height);
		},function() {
			$(this).children('img').css('top', '50%');
	});
	
});

