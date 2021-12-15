$(function() {
	
	// ロード時の window size に合わせてSideNaviを表示
	$(window).on('load', function() {
		rePages();
	});
	
	$(window).on('resize', function() {
		rePages();
	});
	
	function rePages(){
		var settings = $('#settings');
		var contentHeight = $('.page-content').height();
		var settingHeight = contentHeight - settings.height();
		var contentTop = settingHeight / 2;
		
		settings.css('top', contentTop);
	}
	
		/**
		var textarea = $('#aboutMe');
		if(textarea.val() === ''){
			textarea.val('自分自身について（256文字以内）')
			textarea.addClass('placeholder');
		}
		 */
	
});

