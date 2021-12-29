$(function() {
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		rePages();
		inLinefeed($("#privacy"));
	});
	// window size に合わせてSideNaviを非表示
	$(window).on('resize', function() {
		rePages();
		inLinefeed($("#privacy"));
	});
	
	// function
	function rePages(){
		var settings = $('#settings');
		var contentHeight = $('.page-content').height();
		var settingHeight = contentHeight - settings.height();
		var contentTop = settingHeight / 2;
		settings.css('top', contentTop);
	}
	
	// 要素の横幅によって改行を入れる
	function inLinefeed(element) {
		var element_width = element.innerWidth();
		var user_card = element.find('.user-card');
		
		if (element_width >= 642 && element_width < 956) {
			user_card.each(function() {
				$(this).css('width', '33.333%');
			});
		} else if (element_width < 642) {
			user_card.each(function() {
				$(this).css('width', '50%');
			});
		} else {
			user_card.each(function() {
				$(this).css('width', '25%');
			});
		}
	}
});

