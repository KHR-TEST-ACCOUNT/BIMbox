$(function() {
	
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		toggled_userList();
		deside_img_width();
		inLinefeed($('.topics'));
		$('#loading').delay(1000).fadeOut('slow');
		$('#loading_box').delay(700).fadeOut('slow');
	});
	
	$(window).on('resize', function() {
		deside_img_width();
		inLinefeed($('.topics'));
	});
	
	// responsive card topics
	function inLinefeed(element) {
		
		// cardの縦幅を決定
		var windowHeight = $(window).height();
		var pageHeader =  $('.page-header').outerHeight();
		var moodleContainer = $('.moodle-container').innerHeight() + 28;
		var topicArea = windowHeight - pageHeader - moodleContainer;
		var cardsHeight = $('.card-container').height();
		var card_merginTop = 28;
		if(topicArea > cardsHeight + card_merginTop) card_merginTop = (topicArea - cardsHeight) / 2;
		$('.topics').css('height', topicArea);
		$('.card-container').css('margin-top', card_merginTop);
		
		// cardの横幅を決定
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
			$('.page-wrapper').removeClass('toggled');
			$('#loading').css('width', '100%');
		} else {
			$('.page-wrapper').addClass('toggled');
			$('#loading').css('width', windowSize - 260);
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

